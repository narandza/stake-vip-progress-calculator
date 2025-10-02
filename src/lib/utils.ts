import { LanguageType } from "@/constants";
import { MESSAGES } from "@/messages";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bold(text: string | number): string {
  return `<strong>${text}</strong>`;
}

export function formatMoney(
  amount: number,
  locale = "en-US",
  currency = "USD"
) {
  return amount.toLocaleString(locale, { style: "currency", currency });
}

interface WriteMessageParams {
  tier: string;
  nextTier: string;
  tierGap: number;
  language: LanguageType;
  currentPercentage: number;
  remainingToNextTier: number;
}

export function writeMessage({
  tier,
  nextTier,
  tierGap,
  language = "en",
  currentPercentage,
  remainingToNextTier,
}: WriteMessageParams): string {
  return MESSAGES[language]({
    tier: bold(tier),
    nextTier: bold(nextTier),
    tierGap: bold(formatMoney(tierGap) + " USD"),
    currentPercentage: bold(formatMoney(currentPercentage)),
    remainingToNextTier: bold(formatMoney(remainingToNextTier) + " USD"),
  });
}
