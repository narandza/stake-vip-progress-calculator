import { LanguageType } from "@/modules/constants/language";

const ARTICLE = "<strong><em>ADD_ARTICLE</em></strong>";

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

  From what I can see, you’re currently ${currentPercentage}% of the way toward your ${nextTier} VIP level.<br/><br/>

  To move from ${tier} to ${nextTier}, you’ll need to wager a total of ${tierGap}, meaning there's ${remainingToNextTier} left to go.<br/><br/>
  Sports bets count three times more toward your wagering requirements. For example, to work out how many sports bets would get you to the next level, just divide the remaining amount by 3.<br/><br/>

  If you’re placing a mix of sports and casino bets, the best way to keep track of your progress is through your transaction history. We’ve also prepared a quick guide so you can calculate it yourself anytime:<br/>
  ${ARTICLE}<br/><br/>


  If you have any questions or just want an update along the way, we’re here for you 24/7. Keep up the great progress!
  `,

  // Spanish translation
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

  // Arabic translation

  ar: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
شكراً لصبرك.<br/><br/>

حسب ما أرى، أنت حالياً على <strong>${currentPercentage}%</strong> من الطريق نحو مستوى كبار الشخصيات ${nextTier}.<br/><br/>

للانتقال من ${tier} إلى ${nextTier}، ستحتاج إلى المراهنة بمبلغ إجمالي قدره ${tierGap}، أي أن هناك ${remainingToNextTier} متبقي.<br/><br/>

تُحتسب الرهانات الرياضية ثلاثة أضعاف متطلبات المراهنة الخاصة بك. على سبيل المثال، لحساب عدد الرهانات الرياضية التي ستنقلك إلى المستوى التالي، ببساطة اقسم المبلغ المتبقي على 3.<br/><br/>

إذا كنت تراهن على مزيج من الرهانات الرياضية ورهانات الكازينو، فإن أفضل طريقة لتتبع تقدمك هي من خلال سجل معاملاتك. كما أعددنا دليلاً سريعاً لتتمكن من حسابه بنفسك في أي وقت:<br/>
${ARTICLE}<br/><br/>

إذا كانت لديك أي أسئلة أو كنت ترغب فقط في الحصول على تحديث أثناء اللعب، نحن هنا لخدمتك على مدار الساعة طوال أيام الأسبوع. استمر في التقدم الرائع!
`,

  // Turkish translation
  tr: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
  Beklediğiniz için teşekkürler.<br/><br/>

  Gördüğümüz kadarıyla şu anda <strong>${currentPercentage}%</strong> oranında <strong>${nextTier}</strong> VIP seviyenize yaklaştınız.<br/><br/>

  <strong>${tier}</strong> seviyesinden <strong>${nextTier}</strong> seviyesine geçmek için toplam <strong>${tierGap}</strong> çevrim yapmanız gerekmektedir, yani <strong>${remainingToNextTier}</strong> daha kalmıştır.<br/><br/>

  Spor bahisleri, bahis gereksinimlerinize üç kat daha fazla eklenir. Örneğin, bir sonraki seviyeye geçmek için kaç spor bahsi yapmanız gerektiğini hesaplamak için kalan tutarı 3'e bölmeniz yeterlidir.<br/><br/>

  Spor ve casino bahislerini bir arada oynuyorsanız, ilerlemenizi takip etmenin en iyi yolu işlem geçmişinizi incelemektir.<br/>
  Ayrıca, istediğiniz zaman bunu kendiniz hesaplayabilmeniz için hızlı bir rehber hazırladık:<br/>
  ${ARTICLE}<br/><br/>

  Herhangi bir sorunuz varsa veya bu süreçte bir güncelleme isterseniz, 7/24 buradayız. İlerlemenizde bol şanslar!
  `,

  // French translation
  fr: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) => `
  Merci pour votre patience.<br/><br/>

D'après ce que je vois, vous avez atteint ${currentPercentage}% vers le rang VIP ${nextTier}. Pour bouger de ${tier} à ${nextTier}, vous devriez parier un total de ${tierGap}, ce qui veut dire qu'il reste encore ${remainingToNextTier} à parier.<br/><br/>

Les paris sportifs comptent pour trois fois plus pour l'exigence de mise. Par exemple, pour voir combien de paris sportifs vous permettraient d'arriver au prochain rang VIP, il suffit de diviser le montant restant par 3.<br/><br/>

Nous avons aussi préparé un guide rapide, ainsi vous pouvez calculer le progrès à tout moment :<br/>
${ARTICLE}<br/><br/>

Si vous avez des questions ou si vous voulez des informations supplémentaires, nous restons disponibles 24/7 !
`,
};
