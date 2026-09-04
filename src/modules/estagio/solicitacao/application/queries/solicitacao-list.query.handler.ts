import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import type { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import {
  type EstagioSolicitacaoListQuery,
  IEstagioSolicitacaoListQueryHandler,
} from "../../domain/queries/solicitacao-list.query";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class EstagioSolicitacaoListQueryHandlerImpl implements IEstagioSolicitacaoListQueryHandler {
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query?: EstagioSolicitacaoListQuery,
  ): Promise<EstagioSolicitacao[]> {
    await this.permissionChecker.ensureCanManageSolicitacoes(accessContext);
    return await this.solicitacaoRepository.listAll(query);
  }
}
