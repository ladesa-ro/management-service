import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { FolhaPontoListQuery } from "../../domain/queries/folha-ponto-list.query";
import { IFolhaPontoListQueryHandler } from "../../domain/queries/folha-ponto-list.query.handler.interface";
import type { FolhaPontoListQueryResult } from "../../domain/queries/folha-ponto-list.query.result";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoListQueryHandlerImpl implements IFolhaPontoListQueryHandler {
  constructor(
    @Dep(IFolhaPontoRepository)
    private readonly repository: IFolhaPontoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoListQuery,
  ): Promise<FolhaPontoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
