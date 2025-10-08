import { VIP_TIERS } from "@/modules/constants/vip-tiers";
import { CalculateProgressForm } from "@/modules/home/ui/components/calculate-progress-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <CalculateProgressForm tiers={VIP_TIERS} />
    </div>
  );
}
