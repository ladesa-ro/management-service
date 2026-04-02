import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioFindOneQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.handler.interface";
import type { EstagioFindOneQuery, EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioFindOneQueryHandlerImpl implements IEstagioFindOneQueryHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioFindOneQuery,
  ): Promise<EstagioFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
