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
    requirement: 10000,
    icon: "bronze.svg",
  },
  {
    name: "Silver",
    requirement: 50000,
    icon: "silver.svg",
  },
  {
    name: "Gold",
    requirement: 100000,
    icon: "gold.svg",
  },
  {
    name: "Platinum I",
    requirement: 250000,
    icon: "platinum-1.svg",
  },
  {
    name: "Platinum II",
    requirement: 500000,
    icon: "platinum-2.svg",
  },
  {
    name: "Platinum III",
    requirement: 1000000,
    icon: "platinum-3.svg",
  },
  {
    name: "Platinum IV",
    requirement: 2500000,
    icon: "platinum-4.svg",
  },
  {
    name: "Platinum V",
    requirement: 5000000,
    icon: "platinum-5.svg",
  },
  {
    name: "Platinum VI",
    requirement: 10000000,
    icon: "platinum-6.svg",
  },
  {
    name: "Diamond I",
    requirement: 25000000,
    icon: "diamond-1.svg",
  },
  {
    name: "Diamond II",
    requirement: 50000000,
    icon: "diamond-2.svg",
  },
  {
    name: "Diamond III",
    requirement: 100000000,
    icon: "diamond-3.svg",
  },
  {
    name: "Diamond IV",
    requirement: 250000000,
    icon: "diamond-4.svg",
  },
  {
    name: "Diamond V",
    requirement: 500000000,
    icon: "diamond-5.svg",
  },
  {
    name: "Obsidian",
    requirement: 1000000000,
    icon: "obsidian.svg",
  },
];

export const TIER_NAMES = VIP_TIERS.map((tier) => tier.name) as [
  string,
  ...string[]
];

export const TierEnum = z.enum(TIER_NAMES);

export type TierName = z.infer<typeof TierEnum>;
