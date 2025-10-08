import { VIP_TIERS } from "@/modules/constants/vip-tiers";
import { CalculateProgressForm } from "@/modules/home/ui/components/calculate-progress-form";

export default function Home() {
  return <CalculateProgressForm tiers={VIP_TIERS} />;
}
