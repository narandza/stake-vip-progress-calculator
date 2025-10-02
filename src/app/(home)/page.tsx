import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  VIP_TIERS,
} from "@/constants/constants";
import { CalculateProgressForm } from "@/modules/home/ui/components/calculate-progress-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        height={DEFAULT_LOGO_HEIGHT}
        width={DEFAULT_LOGO_WIDTH}
        className="invert mt-6"
      />

      <div className="mt-10 ">
        <h1 className="text-xl">Stake VIP Progress Calculator</h1>
      </div>

      <CalculateProgressForm tiers={VIP_TIERS} />
    </div>
  );
}
