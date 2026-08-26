import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { RelatorioFindOneQuery, RelatorioFindOneQueryResult } from "../../domain/queries";
import { IRelatorioFindOneQueryHandler } from "../../domain/queries/relatorio-find-one.query.handler.interface";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioFindOneQueryHandlerImpl implements IRelatorioFindOneQueryHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: RelatorioFindOneQuery,
  ): Promise<RelatorioFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
