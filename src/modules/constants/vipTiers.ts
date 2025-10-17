import { z } from "zod";

export type VipTier = {
  name: string;
  requirement: number;
  icon: string;
};

export const VIP_TIERS: VipTier[] = [
  {
    name: "None",
    requirement: 0,
    icon: "none.svg",
  },
  {
    name: "Bronze",
    requirement: 10_000,
    icon: "bronze.svg",
  },
  {
    name: "Silver",
    requirement: 50_000,
    icon: "silver.svg",
  },
  {
    name: "Gold",
    requirement: 100_000,
    icon: "gold.svg",
  },
  {
    name: "Platinum I",
    requirement: 250_000,
    icon: "platinum-1.svg",
  },
  {
    name: "Platinum II",
    requirement: 500_000,
    icon: "platinum-2.svg",
  },
  {
    name: "Platinum III",
    requirement: 1_000_000,
    icon: "platinum-3.svg",
  },
  {
    name: "Platinum IV",
    requirement: 2_500_000,
    icon: "platinum-4.svg",
  },
  {
    name: "Platinum V",
    requirement: 5_000_000,
    icon: "platinum-5.svg",
  },
  {
    name: "Platinum VI",
    requirement: 10_000_000,
    icon: "platinum-6.svg",
  },
  {
    name: "Diamond I",
    requirement: 25_000_000,
    icon: "diamond-1.svg",
  },
  {
    name: "Diamond II",
    requirement: 50_000_000,
    icon: "diamond-2.svg",
  },
  {
    name: "Diamond III",
    requirement: 100_000_000,
    icon: "diamond-3.svg",
  },
  {
    name: "Diamond IV",
    requirement: 250_000_000,
    icon: "diamond-4.svg",
  },
  {
    name: "Diamond V",
    requirement: 500_000_000,
    icon: "diamond-5.svg",
  },
  {
    name: "Obsidian",
    requirement: 1_000_000_000,
    icon: "obsidian.svg",
  },
];

export const TIER_NAMES = VIP_TIERS.map((tier) => tier.name) as [
  string,
  ...string[]
];

export const TierEnum = z.enum(TIER_NAMES);

export type TierName = z.infer<typeof TierEnum>;
