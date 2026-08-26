export interface CompanyScoreOptions {
  priorMean?: number; // C: média global prévia / a priori (padrão: 3.5 estrelas)
  priorWeight?: number; // M: confiança / pseudo-amostras a priori (padrão: 5.0)
  recencyHalfLifeDays?: number; // Meia-vida da recência em dias (padrão: 180 dias)
  referenceDate?: Date | string; // Data base para cálculo de recência (padrão: agora)
}

export interface CompanyScoreCalculationResult {
  score: number; // 0.00 a 100.00
  averageRating: number; // 0.00 ou 1.00 a 5.00
  totalReviews: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  scoreVersion: number;
  indicators: {
    priorMean: number;
    priorWeight: number;
    recencyHalfLifeDays: number;
    effectiveSampleWeight: number;
    weightedAverageRating: number;
    rawAverageRating: number;
    totalReviews: number;
    calculatedAt: string;
  };
}

export const COMPANY_SCORE_ALGORITHM_VERSION = 1;

export class CompanyScoreService {
  public static readonly VERSION = COMPANY_SCORE_ALGORITHM_VERSION;

  public static readonly DEFAULT_CONFIG: Required<Omit<CompanyScoreOptions, "referenceDate">> = {
    priorMean: 3.5,
    priorWeight: 5.0,
    recencyHalfLifeDays: 180,
  };

  /**
   * Calcula o score agregado normalizado (0 a 100) e as métricas estatísticas da empresa.
   *
   * Utiliza:
   * 1. Ponderação temporal exponencial (recência) com meia-vida configurável.
   * 2. Média Bayesiana regularizada (Bayesian prior shrinkage) para evitar distorções
   *    em empresas com poucas avaliações (ex: 1 avaliação de 5 estrelas não deve dar 100).
   * 3. Normalização linear do resultado da escala [1, 5] para [0, 100].
   */
  static calculate(
    reviews: Array<{ rating: number; dateCreated: string }>,
    options?: CompanyScoreOptions,
  ): CompanyScoreCalculationResult {
    const priorMean = options?.priorMean ?? CompanyScoreService.DEFAULT_CONFIG.priorMean;
    const priorWeight = options?.priorWeight ?? CompanyScoreService.DEFAULT_CONFIG.priorWeight;
    const halfLifeDays =
      options?.recencyHalfLifeDays ?? CompanyScoreService.DEFAULT_CONFIG.recencyHalfLifeDays;

    const refDate = options?.referenceDate ? new Date(options.referenceDate) : new Date();

    const distribution: { 1: number; 2: number; 3: number; 4: number; 5: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return {
        score: 0,
        averageRating: 0,
        totalReviews: 0,
        distribution,
        scoreVersion: CompanyScoreService.VERSION,
        indicators: {
          priorMean,
          priorWeight,
          recencyHalfLifeDays: halfLifeDays,
          effectiveSampleWeight: 0,
          weightedAverageRating: 0,
          rawAverageRating: 0,
          totalReviews: 0,
          calculatedAt: refDate.toISOString(),
        },
      };
    }

    let sumRatings = 0;
    let weightedSum = 0;
    let effectiveWeightSum = 0;

    for (const review of reviews) {
      const rating = Math.min(5, Math.max(1, review.rating));
      const roundedIntRating = Math.round(rating) as 1 | 2 | 3 | 4 | 5;
      if (distribution[roundedIntRating] !== undefined) {
        distribution[roundedIntRating]++;
      }

      sumRatings += rating;

      // Cálculo de idade da avaliação em dias
      const reviewDate = new Date(review.dateCreated);
      const diffMs = Math.max(0, refDate.getTime() - reviewDate.getTime());
      const ageDays = diffMs / (1000 * 60 * 60 * 24);

      // Decaimento exponencial: peso = 2 ^ (-age / halfLife)
      const recencyWeight = Math.pow(2, -ageDays / halfLifeDays);

      weightedSum += rating * recencyWeight;
      effectiveWeightSum += recencyWeight;
    }

    const rawAverageRating = Number((sumRatings / totalReviews).toFixed(2));
    const weightedAverageRating =
      effectiveWeightSum > 0 ? Number((weightedSum / effectiveWeightSum).toFixed(4)) : priorMean;

    // Fórmula da Média Bayesiana regularizada:
    // R_bayes = (C * M + S) / (M + W)
    // onde C = priorMean, M = priorWeight, S = weightedSum, W = effectiveWeightSum
    const bayesianRating =
      (priorMean * priorWeight + weightedSum) / (priorWeight + effectiveWeightSum);

    // Normalização para a escala 0 a 100:
    // Score = ((R_bayes - 1) / (5 - 1)) * 100 = ((R_bayes - 1) / 4) * 100
    const rawScore = ((bayesianRating - 1) / 4) * 100;
    const clampedScore = Math.max(0, Math.min(100, rawScore));
    const score = Number(clampedScore.toFixed(2));

    return {
      score,
      averageRating: rawAverageRating,
      totalReviews,
      distribution,
      scoreVersion: CompanyScoreService.VERSION,
      indicators: {
        priorMean,
        priorWeight,
        recencyHalfLifeDays: halfLifeDays,
        effectiveSampleWeight: Number(effectiveWeightSum.toFixed(4)),
        weightedAverageRating,
        rawAverageRating,
        totalReviews,
        calculatedAt: refDate.toISOString(),
      },
    };
  }
}
