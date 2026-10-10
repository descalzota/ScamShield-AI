export interface RiskResult {
  level: "LOW" | "MEDIUM" | "HIGH";
  score: number;
  indicators: string[];
}

export function analyzeText(message: string): RiskResult {
  const text = message.toLowerCase();
  let score = 0;
  const indicators: string[] = [];

  const rules = [
    { keyword: "otp", points: 30, reason: "Requests an OTP" },
    { keyword: "password", points: 30, reason: "Mentions a password" },
    { keyword: "urgent", points: 15, reason: "Uses urgent language" },
    { keyword: "click here", points: 20, reason: "Asks you to click a link" },
    { keyword: "gcash", points: 10, reason: "Mentions an e-wallet" },
    { keyword: "prize", points: 20, reason: "Mentions a prize" },
    { keyword: "verify", points: 15, reason: "Requests verification" },
    { keyword: "send your", points: 20, reason: "Requests information" },
  ];

  for (const rule of rules) {
    if (text.includes(rule.keyword)) {
      score += rule.points;
      indicators.push(rule.reason);
    }
  }

  score = Math.min(score, 100);

  const level: RiskResult["level"] =
    score >= 60 ? "HIGH" : score >= 30 ? "MEDIUM" : "LOW";

  return { level, score, indicators };
}