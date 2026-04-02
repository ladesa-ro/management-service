import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstadoFindOneQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import type { EstadoFindOneQuery, EstadoFindOneQueryResult } from "../../domain/queries";
import { IEstadoRepository } from "../../domain/repositories";

@Impl()
export class EstadoFindOneQueryHandlerImpl implements IEstadoFindOneQueryHandler {
  constructor(
    @Dep(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstadoFindOneQuery,
  ): Promise<EstadoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
