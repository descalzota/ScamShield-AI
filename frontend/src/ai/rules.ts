export interface ScamRule {
  id: string;
  pattern: RegExp;
  weight: number;
  description: string;
}

export const scamRules: ScamRule[] = [
  {
    id: "otp",
    pattern: /\b(otp|one.time.password|verification.code)\b/i,
    weight: 25,
    description: "Message mentions an OTP or verification code",
  },
  {
    id: "urgency",
    pattern: /\b(urgent|immediately|within.30.minutes|suspended)\b/i,
    weight: 20,
    description: "Uses urgent or threatening language",
  },
  {
    id: "payment",
    pattern: /\b(registration.fee|advance.payment|send.money)\b/i,
    weight: 25,
    description: "Mentions an advance payment",
  },
  {
    id: "reward",
    pattern: /\b(congratulations|you.won|claim.your.prize)\b/i,
    weight: 15,
    description: "Contains a prize or reward claim",
  },
  {
    id: "taglish",
    pattern: /\b(i.verify|ma.block|magbayad|panalo.ka)\b/i,
    weight: 20,
    description: "Contains a potentially suspicious Taglish phrase",
  },
];