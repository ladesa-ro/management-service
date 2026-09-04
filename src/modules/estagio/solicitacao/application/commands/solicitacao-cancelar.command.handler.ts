import { ConflictError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import {
  type EstagioSolicitacaoCancelarCommand,
  IEstagioSolicitacaoCancelarCommandHandler,
} from "../../domain/commands/solicitacao-cancelar.command";
import type { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class EstagioSolicitacaoCancelarCommandHandlerImpl
  implements IEstagioSolicitacaoCancelarCommandHandler
{
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoCancelarCommand,
  ): Promise<EstagioSolicitacao> {
    const solicitacao = await this.solicitacaoRepository.findById(dto.id);
    if (!solicitacao) {
      throw new ResourceNotFoundError("Solicitação de estágio", dto.id);
    }

    await this.permissionChecker.ensureCanCancelSolicitacao(accessContext, solicitacao);

    if (solicitacao.situacao !== "PENDENTE" && solicitacao.situacao !== "EM_ANALISE") {
      throw new ConflictError(
        `Apenas solicitações com situação PENDENTE ou EM_ANALISE podem ser canceladas. Situação atual: ${solicitacao.situacao}.`,
      );
    }

    solicitacao.cancelar();
    return await this.solicitacaoRepository.save(solicitacao);
  }
}
