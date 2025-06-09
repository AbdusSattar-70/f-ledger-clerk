"use client";

import { ROUTES } from "@/lib/utils/constant";
import { UserProfile, SignOutButton } from "@clerk/nextjs";
import { LogOut, Home } from "lucide-react";

export default function UserProfilePage() {
  return (
    <main className="p-4 bg-[#00002e]">
      <UserProfile path={ROUTES.USER_PROFILE} routing="path">
        {/* Default Clerk pages */}
        <UserProfile.Page label="account" />
        <UserProfile.Page label="security" />

        {/* Link to dashboard */}
        <UserProfile.Link
          label="Back to Dashboard"
          url={ROUTES.DASHBOARD_LEADER}
          labelIcon={<Home className="h-4 w-4" />}
        />

        {/* Sign out as a custom page */}
        <UserProfile.Page
          label="Sign out"
          url="sign-out"
          labelIcon={<LogOut className="h-4 w-4" />}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Ready to sign out?</h2>
            <SignOutButton>
              <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </UserProfile.Page>
      </UserProfile>
    </main>
  );
}
