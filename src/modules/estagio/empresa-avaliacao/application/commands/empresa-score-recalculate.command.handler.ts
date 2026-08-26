import { ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  EmpresaScore,
  IEmpresaAvaliacaoRepository,
  IEmpresaScoreRecalculateCommandHandler,
  IEmpresaScoreRepository,
} from "../../domain";
import type { EmpresaScoreRecalculateCommand } from "../../domain/commands/empresa-score-recalculate.command";
import type { EmpresaScoreFindOneQueryResult } from "../../domain/queries/empresa-score-find-one.query.result";
import { CompanyScoreService } from "../../domain/services/company-score.service";

@Impl()
export class EmpresaScoreRecalculateCommandHandlerImpl
  implements IEmpresaScoreRecalculateCommandHandler
{
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly avaliacaoRepository: IEmpresaAvaliacaoRepository,
    @Dep(IEmpresaScoreRepository)
    private readonly scoreRepository: IEmpresaScoreRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaScoreRecalculateCommand,
  ): Promise<EmpresaScoreFindOneQueryResult> {
    const allReviews = await this.avaliacaoRepository.findAllActiveByEmpresa(dto.empresaId);
    const scoreResult = CompanyScoreService.calculate(allReviews);

    let companyScore = await this.scoreRepository.loadByEmpresaId(accessContext, dto.empresaId);

    if (!companyScore) {
      companyScore = EmpresaScore.create({
        empresa: { id: dto.empresaId },
        score: scoreResult.score,
        averageRating: scoreResult.averageRating,
        totalReviews: scoreResult.totalReviews,
        distribution: scoreResult.distribution,
        scoreVersion: scoreResult.scoreVersion,
        indicators: scoreResult.indicators,
        calculatedAt: scoreResult.indicators.calculatedAt,
      });
    } else {
      companyScore.updateMetrics({
        score: scoreResult.score,
        averageRating: scoreResult.averageRating,
        totalReviews: scoreResult.totalReviews,
        distribution: scoreResult.distribution,
        scoreVersion: scoreResult.scoreVersion,
        indicators: scoreResult.indicators,
        calculatedAt: scoreResult.indicators.calculatedAt,
      });
    }

    await this.scoreRepository.save(companyScore);

    await this.scoreRepository.saveScoreHistorico({
      empresaId: dto.empresaId,
      score: scoreResult.score,
      averageRating: scoreResult.averageRating,
      totalReviews: scoreResult.totalReviews,
      scoreVersion: scoreResult.scoreVersion,
      indicatorsJson: scoreResult.indicators,
      calculatedAt: scoreResult.indicators.calculatedAt,
    });

    const result = await this.scoreRepository.getFindOneQueryResult(accessContext, {
      empresaId: dto.empresaId,
    });

    if (!result) {
      throw new ResourceNotFoundError("Score da empresa não encontrado após recálculo.");
    }

    return result;
  }
}
