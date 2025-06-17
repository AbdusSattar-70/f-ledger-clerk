import { Branding } from "@/components/shared/branding";
import { TypingText } from "../../components/auth/typing-text";
import { DollarAnimation } from "@/components/shared/dollar-animation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Lock } from "lucide-react";
import { TooltipCustom } from "@/components/shared/tooltip-custom";
import { ROUTES } from "@/lib/utils/constant";

export default function AuthHomePage() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[60%_40%] min-h-screen md:h-screen">
      {/* Left Section */}
      <section className="flex-grow bg-[#00002e] px-6 py-10 md:p-12 flex flex-col">
        <div className="mb-4">
          <Branding />
        </div>
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <h2 className="text-gray-300 text-base font-semibold">
              What will you accomplish with{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                F-Ledger
              </span>
              ?
            </h2>
            <h3 className="text-[#d292ff] text-sm sm:text-base font-normal pt-4">
              I want to
              <TypingText />
            </h3>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="bg-black px-6 py-10 md:p-12 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <DollarAnimation />
            <h2 className="text-white text-2xl font-bold mb-4">Get started</h2>

            <div className="flex flex-row gap-4 mt-4 mb-6">
              <SignInButton
                forceRedirectUrl={
                  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL ??
                  ROUTES.DASHBOARD
                }
              >
                <div className="cursor-pointer px-5 py-2.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800 text-center">
                  Sign In
                </div>
              </SignInButton>
              <SignUpButton
                forceRedirectUrl={
                  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL ??
                  ROUTES.DASHBOARD
                }
              >
                <div className="cursor-pointer px-5 py-2.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800 text-center">
                  Sign Up
                </div>
              </SignUpButton>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="flex items-center space-x-2 text-sm text-white">
          <Lock className="w-4 h-4" />
          <TooltipCustom content="Under construction">
            <div className="hover:underline">Terms of use</div>
          </TooltipCustom>
          <span>|</span>
          <TooltipCustom content="Under construction">
            <div className="hover:underline">Privacy policy</div>
          </TooltipCustom>
        </div>
      </section>
    </div>
  );
}
