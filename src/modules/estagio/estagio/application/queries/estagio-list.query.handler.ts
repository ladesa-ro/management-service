import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioListQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import type { EstagioListQuery, EstagioListQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioListQueryHandlerImpl implements IEstagioListQueryHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioListQuery | null,
  ): Promise<EstagioListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
