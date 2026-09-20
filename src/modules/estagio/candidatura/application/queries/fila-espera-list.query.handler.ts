import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { IEstagioCandidaturaPermissionChecker } from "../../domain/authorization/estagio-candidatura-permission-checker.interface";
import type { FilaEsperaListQuery } from "../../domain/queries/fila-espera-list.query";
import type { IFilaEsperaListQueryHandler } from "../../domain/queries/fila-espera-list.query.handler.interface";
import type { FilaEsperaListQueryResult } from "../../domain/queries/fila-espera-list.query.result";
import { IEstagioCandidaturaRepository } from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class FilaEsperaListQueryHandlerImpl implements IFilaEsperaListQueryHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagioRepository)
    private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagioCandidaturaPermissionChecker)
    private readonly permissionChecker: IEstagioCandidaturaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: FilaEsperaListQuery,
  ): Promise<FilaEsperaListQueryResult> {
    await this.permissionChecker.ensureCanListFila(accessContext);

    const estagio = await this.estagioRepository.loadById(accessContext, query.estagioId);
    ensureExists(estagio, "Estagio", query.estagioId);

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const situacao = query["filter.situacao"] ?? query.situacao;

    const { items, total } = await this.repository.findFilaByEstagio(
      accessContext,
      query.estagioId,
      {
        page,
        limit,
        situacao,
      },
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: items,
      meta: {
        totalItems: total,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
      },
    };
  }
}
