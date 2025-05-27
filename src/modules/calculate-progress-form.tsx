import { VipTier } from "@/constants";

interface CalculateProgressFormProps {
  tiers: VipTier[];
}

export const CalculateProgressForm = ({
  tiers,
}: CalculateProgressFormProps) => {
  return (
    <div className="">
      {tiers.map((tier) => (
        <div key={tier.name} className="">
          {tier.name} Tier - Requirement: {tier.requirement}$
        </div>
      ))}
    </div>
  );
};
