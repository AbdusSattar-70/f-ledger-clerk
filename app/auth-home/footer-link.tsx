import { TooltipCustom } from "@/components/shared/tooltip-custom";
import { Lock } from "lucide-react";

export function FooterLinks() {
  return (
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
  );
}
