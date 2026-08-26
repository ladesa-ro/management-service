import { ForbiddenError, ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  EmpresaAvaliacaoHistorico,
  EmpresaScore,
  IEmpresaAvaliacaoDeleteCommandHandler,
  IEmpresaAvaliacaoRepository,
  IEmpresaScoreRepository,
} from "../../domain";
import type { EmpresaAvaliacaoDeleteCommand } from "../../domain/commands/empresa-avaliacao-delete.command";
import { CompanyScoreService } from "../../domain/services/company-score.service";

@Impl()
export class EmpresaAvaliacaoDeleteCommandHandlerImpl
  implements IEmpresaAvaliacaoDeleteCommandHandler
{
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
    @Dep(IEmpresaScoreRepository)
    private readonly scoreRepository: IEmpresaScoreRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoDeleteCommand,
  ): Promise<boolean> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado para inativar uma avaliação.");
    }

    const domain = await this.repository.loadById(accessContext, dto.id);
    if (!domain || !domain.isActive()) {
      throw new ResourceNotFoundError("Avaliação não encontrada.");
    }

    const queryResultCurrent = await this.repository.getFindOneQueryResult(accessContext, {
      id: dto.id,
    });
    const isSuperUser = accessContext?.requestActor?.isSuperUser ?? false;

    if (!isSuperUser && queryResultCurrent?.autor?.id !== userId) {
      throw new ForbiddenError(
        "Você não possui permissão para inativar a avaliação de outro usuário.",
      );
    }

    domain.softDelete();
    await this.repository.save(domain);

    // Registro de auditoria
    const historico = EmpresaAvaliacaoHistorico.create({
      avaliacaoId: domain.id,
      usuarioId: userId,
      ratingAnterior: domain.rating,
      ratingNovo: domain.rating,
      comentarioAnterior: domain.comentario,
      comentarioNovo: null,
      acao: "REMOCAO",
    });

    await this.repository.saveHistorico(historico);

    // Recalcular Score da Empresa
    await this.recalculateCompanyScore(accessContext, domain.empresa.id);

    return true;
  }

  private async recalculateCompanyScore(
    accessContext: IAccessContext | null,
    empresaId: string,
  ): Promise<void> {
    const allReviews = await this.repository.findAllActiveByEmpresa(empresaId);
    const scoreResult = CompanyScoreService.calculate(allReviews);

    let companyScore = await this.scoreRepository.loadByEmpresaId(accessContext, empresaId);

    if (!companyScore) {
      companyScore = EmpresaScore.create({
        empresa: { id: empresaId },
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
      empresaId,
      score: scoreResult.score,
      averageRating: scoreResult.averageRating,
      totalReviews: scoreResult.totalReviews,
      scoreVersion: scoreResult.scoreVersion,
      indicatorsJson: scoreResult.indicators,
      calculatedAt: scoreResult.indicators.calculatedAt,
    });
  }
}
