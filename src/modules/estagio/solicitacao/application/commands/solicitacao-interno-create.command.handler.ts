import { BadRequestException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import {
  type EstagioSolicitacaoInternoCreateCommand,
  IEstagioSolicitacaoInternoCreateCommandHandler,
} from "../../domain/commands/solicitacao-interno-create.command";
import { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class EstagioSolicitacaoInternoCreateCommandHandlerImpl
  implements IEstagioSolicitacaoInternoCreateCommandHandler
{
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoInternoCreateCommand,
  ): Promise<EstagioSolicitacao> {
    const { estagiarioId, campusId } =
      await this.permissionChecker.ensureCanCreateSolicitacao(accessContext);

    const activeCount = await this.solicitacaoRepository.countActiveByEstagiarioId(estagiarioId);
    if (activeCount >= 3) {
      throw new BadRequestException(
        "Você já possui o limite máximo de 3 solicitações de estágio em análise simultaneamente.",
      );
    }

    const solicitacao = EstagioSolicitacao.createInterno({
      estagiarioId,
      campusId,
      professorOrientadorId: dto.professorConselheiro.id,
      localInterno: dto.local,
      descricaoAtividades: dto.descricao,
    });

    return await this.solicitacaoRepository.save(solicitacao);
  }
}
