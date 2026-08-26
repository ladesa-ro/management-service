import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { RelatorioListQuery, RelatorioListQueryResult } from "../../domain/queries";
import { IRelatorioListQueryHandler } from "../../domain/queries/relatorio-list.query.handler.interface";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioListQueryHandlerImpl implements IRelatorioListQueryHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: RelatorioListQuery | null = null,
  ): Promise<RelatorioListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
