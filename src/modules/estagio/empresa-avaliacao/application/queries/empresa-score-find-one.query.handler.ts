import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  EmpresaScore,
  IEmpresaAvaliacaoRepository,
  IEmpresaScoreFindOneQueryHandler,
  IEmpresaScoreRepository,
} from "../../domain";
import type {
  EmpresaScoreFindOneQuery,
  EmpresaScoreFindOneQueryResult,
} from "../../domain/queries";
import { CompanyScoreService } from "../../domain/services/company-score.service";

@Impl()
export class EmpresaScoreFindOneQueryHandlerImpl implements IEmpresaScoreFindOneQueryHandler {
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly avaliacaoRepository: IEmpresaAvaliacaoRepository,
    @Dep(IEmpresaScoreRepository)
    private readonly scoreRepository: IEmpresaScoreRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaScoreFindOneQuery,
  ): Promise<EmpresaScoreFindOneQueryResult> {
    let result = await this.scoreRepository.getFindOneQueryResult(accessContext, {
      empresaId: dto.empresaId,
    });

    if (!result) {
      // Se ainda não foi persistido, calcula com base nas avaliações existentes (ou padrão vazio) e persiste
      const allReviews = await this.avaliacaoRepository.findAllActiveByEmpresa(dto.empresaId);
      const scoreResult = CompanyScoreService.calculate(allReviews);

      const newScore = EmpresaScore.create({
        empresa: { id: dto.empresaId },
        score: scoreResult.score,
        averageRating: scoreResult.averageRating,
        totalReviews: scoreResult.totalReviews,
        distribution: scoreResult.distribution,
        scoreVersion: scoreResult.scoreVersion,
        indicators: scoreResult.indicators,
        calculatedAt: scoreResult.indicators.calculatedAt,
      });

      await this.scoreRepository.save(newScore);

      result = await this.scoreRepository.getFindOneQueryResult(accessContext, {
        empresaId: dto.empresaId,
      });
    }

    return result!;
  }
}
