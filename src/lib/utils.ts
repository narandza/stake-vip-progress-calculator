import { LanguageType } from "@/constants/constants";
import { MESSAGES } from "@/constants/messages";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export function bold(text: string | number): string {
  return `<strong>${text}</strong>`;
}

export function formatMoney(value: number, currency = "USD") {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
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
    tierGap: bold(formatMoney(tierGap)),
    currentPercentage: bold(formatMoney(currentPercentage)),
    remainingToNextTier: bold(formatMoney(remainingToNextTier)),
  });
}
