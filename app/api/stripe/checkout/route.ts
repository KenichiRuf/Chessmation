import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, SubscriptionStatus } from '@/lib/db/schema';
import { setSession } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe';
import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    console.error('No session_id provided in URL params');
    return NextResponse.redirect(new URL('/premium', request.url));
  }

  try {
    console.log('Retrieving Stripe session:', sessionId);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription'],
    });

    if (!session.customer || typeof session.customer === 'string') {
      console.error('Invalid customer data:', session.customer);
      throw new Error('Invalid customer data from Stripe.');
    }

    const customerId = session.customer.id;
    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id;

    console.log('Customer ID:', customerId);
    console.log('Subscription ID:', subscriptionId);

    if (!subscriptionId) {
      console.error('No subscription found in session:', session);
      throw new Error('No subscription found for this session.');
    }

    console.log('Retrieving subscription details');
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    });

    const plan = subscription.items.data[0]?.price;
    console.log('Plan details:', {
      id: plan?.id,
      productId: plan?.product,
      name: (plan?.product as Stripe.Product)?.name
    });

    if (!plan) {
      console.error('No plan found in subscription:', subscription);
      throw new Error('No plan found for this subscription.');
    }

    const productId = (plan.product as Stripe.Product).id;

    if (!productId) {
      console.error('No product ID in plan:', plan);
      throw new Error('No product ID found for this subscription.');
    }

    const userId = session.client_reference_id;
    console.log('User ID from session:', userId);
    
    if (!userId) {
      console.error('No client_reference_id in session:', session);
      throw new Error("No user ID found in session's client_reference_id.");
    }

    console.log('Querying user from database');
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(userId)))
      .limit(1);

    if (user.length === 0) {
      console.error('User not found for ID:', userId);
      throw new Error('User not found in database.');
    }

    console.log('Querying team membership');
    const userTeam = await db
      .select({
        teamId: teamMembers.teamId,
      })
      .from(teamMembers)
      .where(eq(teamMembers.userId, user[0].id))
      .limit(1);

    if (userTeam.length === 0) {
      console.error('No team found for user:', user[0].id);
      throw new Error('User is not associated with any team.');
    }

    console.log('Updating team subscription data');
    await db
      .update(teams)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        stripeProductId: productId,
        planName: (plan.product as Stripe.Product).name,
        subscriptionStatus: subscription.status as SubscriptionStatus,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, userTeam[0].teamId));

    console.log('Setting user session');
    await setSession(user[0]);
    
    console.log('Redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Detailed error in checkout handler:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
