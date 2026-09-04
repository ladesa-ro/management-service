import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import type { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import { IMinhasSolicitacoesListQueryHandler } from "../../domain/queries/minhas-solicitacoes-list.query";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class MinhasSolicitacoesListQueryHandlerImpl implements IMinhasSolicitacoesListQueryHandler {
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null): Promise<EstagioSolicitacao[]> {
    const { estagiarioId } =
      await this.permissionChecker.ensureCanViewMinhasSolicitacoes(accessContext);

    return await this.solicitacaoRepository.findByEstagiarioId(estagiarioId);
  }
}
