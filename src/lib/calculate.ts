import { TierName, VIP_TIERS } from "@/constants";

interface calculateProgressProps {
  percentage: number;
  tierName: TierName;
}

export const calculateProgress = ({
  percentage,
  tierName,
}: calculateProgressProps) => {
  const normalizedTierName = tierName.trim().toLowerCase();

  const sortedTiers = [...VIP_TIERS].sort(
    (a, b) => a.requirement - b.requirement
  );

  const currentTierIndex = sortedTiers.findIndex(
    (t) => t.name.toLowerCase() === normalizedTierName
  );

  if (currentTierIndex === -1 || currentTierIndex === sortedTiers.length - 1) {
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
    tierGap,
  };
};
