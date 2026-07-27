import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { FolhaPontoFindOneQuery } from "../../domain/queries/folha-ponto-find-one.query";
import { IFolhaPontoFindOneQueryHandler } from "../../domain/queries/folha-ponto-find-one.query.handler.interface";
import type { FolhaPontoFindOneQueryResult } from "../../domain/queries/folha-ponto-find-one.query.result";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoFindOneQueryHandlerImpl implements IFolhaPontoFindOneQueryHandler {
  constructor(
    @Dep(IFolhaPontoRepository)
    private readonly repository: IFolhaPontoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoFindOneQuery,
  ): Promise<FolhaPontoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
