export interface URLAnalysis {
  indicators: string[];
  score: number;
}

export function analyzeURL(input: string): URLAnalysis {
  const indicators: string[] = [];
  let score = 0;

  let url: URL;

  try {
    url = new URL(input.trim());
  } catch {
    return {
      indicators: ["Invalid URL format"],
      score: 0,
    };
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return {
      indicators: ["Unsupported URL protocol"],
      score: 0,
    };
  }

  const hostname = url.hostname.toLowerCase();

  if (url.protocol === "http:") {
    score += 15;
    indicators.push("URL does not use HTTPS");
  }

  if (hostname.includes("xn--")) {
    score += 20;
    indicators.push("Contains a punycode hostname");
  }

  if (hostname.length > 50) {
    score += 10;
    indicators.push("Unusually long hostname");
  }

  if (url.username || url.password) {
    score += 30;
    indicators.push("Contains URL user information");
  }

  return {
    indicators,
    score: Math.min(score, 100),
  };
}