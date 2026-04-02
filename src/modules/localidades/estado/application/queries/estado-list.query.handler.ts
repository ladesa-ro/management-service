import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstadoListQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import type { EstadoListQuery, EstadoListQueryResult } from "../../domain/queries";
import { IEstadoRepository } from "../../domain/repositories";

@Impl()
export class EstadoListQueryHandlerImpl implements IEstadoListQueryHandler {
  constructor(
    @Dep(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstadoListQuery | null,
  ): Promise<EstadoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
