import { TierName, VIP_TIERS } from "@/vip-tiers";

interface calculateProgressProps {
  percentage: number;
  tierName: TierName;
}

export const calculateProgress = ({
  percentage,
  tierName,
}: calculateProgressProps) => {
  const currentTierIndex = VIP_TIERS.findIndex(
    (tier) => (tier.name = tierName)
  );

  if (currentTierIndex === -1 || currentTierIndex === VIP_TIERS.length - 1) {
    return null;
  }

  const currentTier = VIP_TIERS[currentTierIndex];
  const nextTier = VIP_TIERS[currentTierIndex + 1];

  const tierGap = nextTier.requirement - currentTier.requirement;
  const wageredInTier = (percentage / 100) * tierGap;

  const totalWagered = currentTier.requirement + wageredInTier;

  const remainingToNextTier = tierGap - wageredInTier;

  return {
    currentTier: currentTier.name,
    nextTier: nextTier.name,
    totalWagered,
    wageredInCurrentTier: wageredInTier,
    remainingToNextTier,
    nextTierRequirement: nextTier.requirement,
  };
};
