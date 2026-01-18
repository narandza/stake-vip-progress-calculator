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
  From what I can see, you’re currently ${currentPercentage}% of the way toward your ${nextTier} VIP level.<br/><br/>

  To move from ${tier} to ${nextTier}, you’ll need to wager a total of ${tierGap}, meaning there's ${remainingToNextTier} left to go.<br/><br/>

 Sports bets count three times more toward your VIP progression, while Stake Originals games count twice as much. For example, to calculate how much wagering is needed to reach the next level using sports bets, simply divide the remaining amount by 3. If you’re playing Stake Originals games, divide the remaining amount by 2.<br/><br/>

  We’ve also prepared a quick guide so you can calculate it yourself anytime:<br/>
  ${ARTICLE}<br/><br/>


  If you have any questions or just want an update along the way, we’re here for you 24/7. Keep up the great progress!
  `,

  // Spanish translation
  es: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
  Gracias por tu paciencia.<br/><br/>
  
  Por lo que veo, actualmente llevas un ${currentPercentage}% de progreso hacia tu nivel VIP ${nextTier}.<br/><br/>
  
  Para pasar de ${tier} a ${nextTier}, necesitas apostar un total de ${tierGap}, lo que significa que aún te faltan ${remainingToNextTier} para alcanzarlo.<br/><br/>
  
  Las apuestas deportivas cuentan tres veces más para tu progreso VIP, mientras que los juegos Stake Originals cuentan el doble. Por ejemplo, para calcular cuánto necesitas apostar para alcanzar el siguiente nivel usando apuestas deportivas, simplemente divide la cantidad restante entre 3. Si estás jugando juegos Stake Originals, divide la cantidad restante entre 2.<br/><br/>
  
  También hemos preparado una guía rápida para que puedas calcularlo tú mismo en cualquier momento:<br/>
  ${ARTICLE}<br/><br/>
  
  Si tienes alguna otra pregunta o quieres una actualización de tu progreso, estamos disponibles para ayudarte las 24 horas, los 7 días de la semana. Sigue así, estás muy cerca.
  `,

  // Arabic translation

  ar: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
شكراً لصبرك.<br/><br/>

حسب ما أرى، أنت حالياً على <strong>${currentPercentage}%</strong> من الطريق نحو مستوى كبار الشخصيات ${nextTier}.<br/><br/>

للانتقال من ${tier} إلى ${nextTier}، ستحتاج إلى المراهنة بمبلغ إجمالي قدره ${tierGap}، أي أن هناك ${remainingToNextTier} متبقي.<br/><br/>

تُحتسب الرهانات الرياضية بثلاثة أضعاف ضمن تقدمك في برنامج كبار الشخصيات، بينما تُحتسب ألعاب Stake Originals بضعفين. على سبيل المثال، لحساب مقدار المراهنة المطلوب للوصول إلى المستوى التالي باستخدام الرهانات الرياضية، ما عليك سوى قسمة المبلغ المتبقي على 3. وإذا كنت تلعب ألعاب Stake Originals، فقسّم المبلغ المتبقي على 2.<br/><br/>

كما أعددنا دليلاً سريعاً لتتمكن من حسابه بنفسك في أي وقت:<br/>
${ARTICLE}<br/><br/>


إذا كانت لديك أي أسئلة أو كنت ترغب فقط في الحصول على تحديث أثناء اللعب، نحن هنا لخدمتك على مدار الساعة طوال أيام الأسبوع. استمر في التقدم الرائع!
`,

  // Turkish translation
  tr: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) =>
    `
  Beklediğiniz için teşekkürler.<br/><br/>

  Gördüğümüz kadarıyla şu anda <strong>${currentPercentage}%</strong> oranında <strong>${nextTier}</strong> VIP seviyenize yaklaştınız.<br/><br/>

  <strong>${tier}</strong> seviyesinden <strong>${nextTier}</strong> seviyesine geçmek için toplam <strong>${tierGap}</strong> çevrim yapmanız gerekmektedir, yani <strong>${remainingToNextTier}</strong> daha kalmıştır.<br/><br/>

  Spor bahisleri VIP ilerlemenize üç kat katkı sağlarken, Stake Originals oyunları iki kat sayılır. Örneğin, spor bahisleri kullanarak bir sonraki seviyeye ulaşmak için gereken bahis miktarını hesaplamak için kalan tutarı 3’e bölmeniz yeterlidir. Stake Originals oyunları oynuyorsanız, kalan tutarı 2’ye bölün.<br/><br/>

  Ayrıca, istediğiniz zaman bunu kendiniz hesaplayabilmeniz için hızlı bir rehber hazırladık:<br/>
  ${ARTICLE}<br/><br/>

  Herhangi bir sorunuz varsa veya bu süreçte bir güncelleme isterseniz, 7/24 buradayız. İlerlemenizde bol şanslar!
  `,

  // French translation
  fr: ({ tier, nextTier, tierGap, currentPercentage, remainingToNextTier }) => `
  Merci pour votre patience.<br/><br/>

D'après ce que je vois, vous avez atteint ${currentPercentage}% vers le rang VIP ${nextTier}. Pour bouger de ${tier} à ${nextTier}, vous devriez parier un total de ${tierGap}, ce qui veut dire qu'il reste encore ${remainingToNextTier} à parier.<br/><br/>

Les paris sportifs comptent pour trois fois plus pour l'exigence de mise. Par exemple, pour voir combien de paris sportifs vous permettraient d'arriver au prochain rang Les paris sportifs comptent trois fois plus dans votre progression VIP, tandis que les jeux Stake Originals comptent double. Par exemple, pour calculer le montant de mise nécessaire pour atteindre le niveau suivant en utilisant des paris sportifs, il suffit de diviser le montant restant par 3. Si vous jouez aux jeux Stake Originals, divisez le montant restant par 2.<br/><br/>

Nous avons aussi préparé un guide rapide, ainsi vous pouvez calculer le progrès à tout moment :<br/>
${ARTICLE}<br/><br/>

Si vous avez des questions ou si vous voulez des informations supplémentaires, nous restons disponibles 24/7 !
`,
};
