export interface ReviewRelevanceOptions {
  likesWeight?: number; // Peso para curtidas (padrão: 5.0)
  recencyWeight?: number; // Peso para recência (padrão: 3.0)
  contentWeight?: number; // Peso para detalhamento/conteúdo (padrão: 2.0)
  recencyHalfLifeDays?: number; // Meia-vida da relevância em dias (padrão: 90 dias)
  referenceDate?: Date | string; // Data base para cálculo (padrão: agora)
}

export const REVIEW_RELEVANCE_ALGORITHM_VERSION = 1;

export class ReviewRelevanceService {
  public static readonly VERSION = REVIEW_RELEVANCE_ALGORITHM_VERSION;

  public static readonly DEFAULT_CONFIG: Required<Omit<ReviewRelevanceOptions, "referenceDate">> = {
    likesWeight: 5.0,
    recencyWeight: 3.0,
    contentWeight: 2.0,
    recencyHalfLifeDays: 90,
  };

  /**
   * Calcula o score de relevância do comentário.
   *
   * Fatores:
   * 1. Quantidade de curtidas (com amortecimento logarítmico para evitar dominância de comentários antigos).
   * 2. Recência do comentário (decaimento suave com meia-vida configurável).
   * 3. Densidade de conteúdo do comentário (comentários construtivos e detalhados têm bônus).
   */
  static calculate(
    review: {
      likesCount: number;
      dateCreated: string;
      comentario?: string | null;
    },
    options?: ReviewRelevanceOptions,
  ): number {
    const likesWeight = options?.likesWeight ?? ReviewRelevanceService.DEFAULT_CONFIG.likesWeight;
    const recencyWeight =
      options?.recencyWeight ?? ReviewRelevanceService.DEFAULT_CONFIG.recencyWeight;
    const contentWeight =
      options?.contentWeight ?? ReviewRelevanceService.DEFAULT_CONFIG.contentWeight;
    const halfLifeDays =
      options?.recencyHalfLifeDays ?? ReviewRelevanceService.DEFAULT_CONFIG.recencyHalfLifeDays;

    const refDate = options?.referenceDate ? new Date(options.referenceDate) : new Date();
    const reviewDate = new Date(review.dateCreated);

    // 1. Sinal de curtidas: ln(1 + L)
    const validLikes = Math.max(0, review.likesCount ?? 0);
    const likesFactor = Math.log(1 + validLikes);

    // 2. Sinal de recência: decaimento hiperbólico ou exponencial
    const diffMs = Math.max(0, refDate.getTime() - reviewDate.getTime());
    const ageDays = diffMs / (1000 * 60 * 60 * 24);
    const recencyFactor = 1 / (1 + ageDays / halfLifeDays);

    // 3. Sinal de detalhe / qualidade do texto (comentários detalhados até 200 caracteres ganham peso proporcional)
    const commentLength = review.comentario?.trim().length ?? 0;
    const contentFactor = Math.min(1.0, commentLength / 200);

    const relevance =
      likesWeight * likesFactor + recencyWeight * recencyFactor + contentWeight * contentFactor;

    return Number(Math.max(0, relevance).toFixed(4));
  }
}
