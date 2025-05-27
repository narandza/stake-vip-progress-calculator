import { z } from "zod";

export type VipTier = {
  name: string;
  requirement: number;
};

export const VIP_TIERS: VipTier[] = [
  { name: "none", requirement: 0 },
  { name: "bronze", requirement: 10_000 },
  { name: "silver", requirement: 50_000 },
  { name: "gold", requirement: 100_000 },
  { name: "platinum I", requirement: 250_000 },
  { name: "platinum II", requirement: 500_000 },
  { name: "platinum III", requirement: 1_000_000 },
  { name: "platinum IV", requirement: 2_500_000 },
  { name: "platinum V", requirement: 5_000_000 },
  { name: "platinum VI", requirement: 10_000_000 },
  { name: "diamond I", requirement: 25_000_000 },
  { name: "diamond II", requirement: 50_000_000 },
  { name: "diamond III", requirement: 100_000_000 },
  { name: "diamond IV", requirement: 250_000_000 },
  { name: "diamond V", requirement: 500_000_000 },
  { name: "obsidian", requirement: 1_000_000_000 },
];

export const TIER_NAMES = VIP_TIERS.map((tier) => tier.name) as [
  string,
  ...string[]
];

export const TierEnum = z.enum(TIER_NAMES);

export type TierName = z.infer<typeof TierEnum>;
