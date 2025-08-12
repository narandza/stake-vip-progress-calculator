import { z } from "zod";

export type VipTier = {
  name: string;
  requirement: number;
};

export const VIP_TIERS: VipTier[] = [
  { name: "None", requirement: 0 },
  { name: "Bronze", requirement: 10_000 },
  { name: "Silver", requirement: 50_000 },
  { name: "Gold", requirement: 100_000 },
  { name: "Platinum I", requirement: 250_000 },
  { name: "Platinum II", requirement: 500_000 },
  { name: "Platinum III", requirement: 1_000_000 },
  { name: "Platinum IV", requirement: 2_500_000 },
  { name: "Platinum V", requirement: 5_000_000 },
  { name: "Platinum VI", requirement: 10_000_000 },
  { name: "Diamond I", requirement: 25_000_000 },
  { name: "Diamond II", requirement: 50_000_000 },
  { name: "Diamond III", requirement: 100_000_000 },
  { name: "Diamond IV", requirement: 250_000_000 },
  { name: "Diamond V", requirement: 500_000_000 },
  { name: "Obsidian", requirement: 1_000_000_000 },
];

export const TIER_NAMES = VIP_TIERS.map((tier) => tier.name) as [
  string,
  ...string[]
];

export const TierEnum = z.enum(TIER_NAMES);

export type TierName = z.infer<typeof TierEnum>;

export const DEFAULT_LOGO_WIDTH = 128;
export const DEFAULT_LOGO_HEIGHT = 128;

export const LanguageEnum = z.enum(["en", "es"]);
export type LanguageType = z.infer<typeof LanguageEnum>;
