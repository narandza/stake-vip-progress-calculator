import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function writeMessage(
  tier: string,
  nextTier: string,
  tierGap: number,
  language: "es" | "en" = "en",
  currentPercentage: number,
  remainingToNextTier: number
): string {
  if (language === "es") {
    return "TODO: spanish message";
  }

  return `Thank you for your patience.\n\nFrom what I can see, you’re currently ${currentPercentage}% of the way toward your ${nextTier} VIP level.\n\nTo move from ${tier} to ${nextTier}, you’ll need to wager a total of ${tierGap.toLocaleString()}, meaning there's ${remainingToNextTier.toLocaleString()} left to go.\n\nSports bets count three times more toward your wagering requirements. For example, to work out how many sports bets would get you to the next level, just divide the remaining amount by 3.\n\nIf you’re placing a mix of sports and casino bets, the best way to keep track of your progress is through your transaction history. We’ve also prepared a quick guide so you can calculate it yourself anytime:\nADD_ARTICLE\n\nIf you have any questions or just want an update along the way, we’re here for you 24/7. Keep up the great progress!`;
}
