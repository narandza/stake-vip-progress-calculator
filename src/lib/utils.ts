import { LanguageType } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function writeMessage(
  tier: string,
  nextTier: string,
  tierGap: number,
  language: LanguageType = "en",
  currentPercentage: number,
  remainingToNextTier: number
): string {
  if (language === "es") {
    return `Gracias por tu paciencia.\n\nPor lo que veo, actualmente llevas un ${currentPercentage}% de progreso hacia tu nivel VIP ${nextTier}.\n\nPara pasar de ${tier} a ${nextTier}, necesitas apostar un total de ${tierGap.toLocaleString()}, lo que significa que aún te faltan ${remainingToNextTier.toLocaleString()} para alcanzarlo.\n\nLas apuestas deportivas cuentan tres veces más para cumplir con tus requisitos de apuesta. Por ejemplo, para calcular cuántas apuestas deportivas necesitarías para llegar al siguiente nivel, solo divide la cantidad restante entre 3.\n\nSi realizas una combinación de apuestas deportivas y de casino, la mejor manera de seguir tu progreso es revisando tu historial de transacciones. También hemos preparado una guía rápida para que puedas calcularlo tú mismo en cualquier momento:\nADD_ARTICLE\n\nSi tienes alguna otra pregunta o quieres una actualización de tu progreso, estamos disponibles para ayudarte las 24 horas, los 7 días de la semana. Sigue así, estás muy cerca.`;
  }

  return `Thank you for your patience.\n\nFrom what I can see, you’re currently ${currentPercentage}% of the way toward your ${nextTier} VIP level.\n\nTo move from ${tier} to ${nextTier}, you’ll need to wager a total of ${tierGap.toLocaleString()}, meaning there's ${remainingToNextTier.toLocaleString()} left to go.\n\nSports bets count three times more toward your wagering requirements. For example, to work out how many sports bets would get you to the next level, just divide the remaining amount by 3.\n\nIf you’re placing a mix of sports and casino bets, the best way to keep track of your progress is through your transaction history. We’ve also prepared a quick guide so you can calculate it yourself anytime:\nADD_ARTICLE\n\nIf you have any questions or just want an update along the way, we’re here for you 24/7. Keep up the great progress!`;
}
