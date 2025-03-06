import { compare, hash } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NewUser, SubscriptionStatus } from '@/lib/db/schema';
import { db } from '@/lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { teamMembers, teams } from '@/lib/db/schema';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

type SessionData = {
  user: {
    id: number;
    subscription?: {
      status: SubscriptionStatus | null;
      planName?: string;
    };
  };
  expires: string;
};

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(key);
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload as SessionData;
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  return await verifyToken(session);
}

export async function setSession(user: NewUser) {
  // Get the user's team and subscription data
  const [teamMember] = await db
    .select({
      team: teams,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, user.id!))
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .limit(1);

  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  const session: SessionData = {
    user: {
      id: user.id!,
      subscription: teamMember?.team ? {
        status: teamMember.team.subscriptionStatus as SubscriptionStatus,
        planName: teamMember.team.planName || undefined
      } : undefined
    },
    expires: expiresInOneDay.toISOString(),
  };

  const encryptedSession = await signToken(session);
  (await cookies()).set('session', encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
}
