import { Branding } from "@/components/shared/branding";
import { TypingText } from "./typing-text";
import { DollarAnimation } from "@/components/shared/dollar-animation";
import { AuthButtons } from "./auth-buttons";
import { FooterLinks } from "./footer-link";

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
            <AuthButtons />
          </div>
        </div>
        <div>
          <FooterLinks />
        </div>
      </section>
    </div>
  );
}
