'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { TeamDataWithMembers } from '@/lib/db/schema';

export function Settings({ teamData }: { teamData: TeamDataWithMembers }) {

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Your Chessmation Subscription</h1>
      <Card className="bg-[#272727] border-gray-700 mb-8 pt-8 pb-4">
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium text-white">
                  Current Plan: {teamData.planName || 'Free'}
                </p>
                <p className="text-sm text-gray-400">
                  {teamData.subscriptionStatus === 'active'
                    ? 'Billed monthly'
                    : teamData.subscriptionStatus === 'trialing'
                      ? 'Trial period'
                      : 'No active subscription'}
                </p>
              </div>
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline" className="bg-[#99BC59] hover:bg-[#8CAF4D] text-white border-gray-600 hover:text-white">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
