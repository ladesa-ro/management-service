import {
  ConflictError,
  ForbiddenError,
  ResourceNotFoundError,
  UnauthorizedError,
} from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  EmpresaAvaliacao,
  EmpresaAvaliacaoHistorico,
  EmpresaScore,
  IEmpresaAvaliacaoCreateCommandHandler,
  IEmpresaAvaliacaoRepository,
  IEmpresaScoreRepository,
} from "../../domain";
import type { EmpresaAvaliacaoCreateCommand } from "../../domain/commands/empresa-avaliacao-create.command";
import type { EmpresaAvaliacaoFindOneQueryResult } from "../../domain/queries/empresa-avaliacao-find-one.query.result";
import { CompanyScoreService } from "../../domain/services/company-score.service";

@Impl()
export class EmpresaAvaliacaoCreateCommandHandlerImpl
  implements IEmpresaAvaliacaoCreateCommandHandler
{
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
    @Dep(IEmpresaScoreRepository)
    private readonly scoreRepository: IEmpresaScoreRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoCreateCommand,
  ): Promise<EmpresaAvaliacaoFindOneQueryResult> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado para avaliar uma empresa.");
    }

    // 1. Validação de elegibilidade (vínculo de estágio passado ou presente com a empresa)
    const eligibility = await this.repository.checkInternshipEligibility(userId, dto.empresaId);
    if (!eligibility.eligible || !eligibility.estagiarioId) {
      throw new ForbiddenError(
        eligibility.reason ??
          "Somente estagiários que possuem ou já possuíram vínculo de estágio com a empresa podem avaliá-la.",
      );
    }

    // 2. Prevenção de duplicidade de avaliação ativa
    const existing = await this.repository.findActiveByEmpresaAndEstagiario(
      dto.empresaId,
      eligibility.estagiarioId,
    );
    if (existing) {
      throw new ConflictError(
        "Você já avaliou esta empresa. Para alterar sua nota ou comentário, utilize a edição da avaliação.",
      );
    }

    // 3. Criação da entidade de domínio
    const domain = EmpresaAvaliacao.create({
      empresa: { id: dto.empresaId },
      estagiario: { id: eligibility.estagiarioId },
      rating: dto.rating,
      comentario: dto.comentario,
    });

    await this.repository.save(domain);

    // 4. Registro de auditoria do histórico
    const historico = EmpresaAvaliacaoHistorico.create({
      avaliacaoId: domain.id,
      usuarioId: userId,
      ratingAnterior: null,
      ratingNovo: domain.rating,
      comentarioAnterior: null,
      comentarioNovo: domain.comentario,
      acao: "CRIACAO",
    });

    await this.repository.saveHistorico(historico);

    // 5. Recalcular e persistir o Score da empresa
    await this.recalculateCompanyScore(accessContext, dto.empresaId);

    // 6. Retorno dos dados formatados
    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    if (!result) {
      throw new ResourceNotFoundError("Avaliação criada não foi encontrada.");
    }

    return result;
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

    // Histórico de auditoria do score
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
