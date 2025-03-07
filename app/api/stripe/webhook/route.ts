import Stripe from 'stripe';
import { handleSubscriptionChange, stripe } from '@/lib/payments/stripe';
import { NextRequest, NextResponse } from 'next/server';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 }
    );
  }

  // Return 200 response immediately after signature verification
  const response = NextResponse.json({ received: true });

  // Process the webhook asynchronously
  (async () => {
    try {
      switch (event.type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionChange(subscription);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error(`Error processing webhook: ${error}`);
      // We can't modify the response here since it's already been sent
    }
  })();

  return response;
}
