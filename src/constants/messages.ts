import { LanguageType } from "@/constants/language";

const ARTICLE = "<strong><em>ADD_ARTICLE<em/><strong>";

interface MessageParams {
  tier: string;
  nextTier: string;
  tierGap: string;
  currentPercentage: string;
  remainingToNextTier: string;
}

type MessageTemplates = Record<LanguageType, (params: MessageParams) => string>;

export const MESSAGES: MessageTemplates = {
  en: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
  Thank you for your patience.<br/><br/>

  From what I can see, you’re currently <strong>${currentPercentage}%</strong> of the way toward your ${nextTier} VIP level.<br/><br/>

  To move from ${tier} to ${nextTier}, you’ll need to wager a total of ${tierGap}, meaning there's ${remainingToNextTier} left to go.<br/><br/>
  Sports bets count three times more toward your wagering requirements. For example, to work out how many sports bets would get you to the next level, just divide the remaining amount by 3.<br/><br/>

  If you’re placing a mix of sports and casino bets, the best way to keep track of your progress is through your transaction history. We’ve also prepared a quick guide so you can calculate it yourself anytime:<br/>
  ${ARTICLE}<br/><br/>


  If you have any questions or just want an update along the way, we’re here for you 24/7. Keep up the great progress!
  `,

  es: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
  Gracias por tu paciencia.<br/><br/>
  
  Por lo que veo, actualmente llevas un ${currentPercentage}% de progreso hacia tu nivel VIP ${nextTier}.<br/><br/>
  
  Para pasar de ${tier} a ${nextTier}, necesitas apostar un total de ${tierGap}, lo que significa que aún te faltan ${remainingToNextTier} para alcanzarlo.<br/><br/>
  
  Las apuestas deportivas cuentan tres veces más para cumplir con tus requisitos de apuesta. Por ejemplo, para calcular cuántas apuestas deportivas necesitarías para llegar al siguiente nivel, solo divide la cantidad restante entre 3.<br/><br/>
  
  Si realizas una combinación de apuestas deportivas y de casino, la mejor manera de seguir tu progreso es revisando tu historial de transacciones. También hemos preparado una guía rápida para que puedas calcularlo tú mismo en cualquier momento:<br/>
  ${ARTICLE}<br/><br/>
  
  Si tienes alguna otra pregunta o quieres una actualización de tu progreso, estamos disponibles para ayudarte las 24 horas, los 7 días de la semana. Sigue así, estás muy cerca.
  `,
};
