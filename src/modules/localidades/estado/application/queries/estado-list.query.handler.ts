import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEstadoListQuery,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import type { EstadoListQueryResult } from "../../domain/queries";
import { IEstadoRepository } from "../../domain/repositories";
@DeclareImplementation()
export class EstadoListQueryHandlerImpl implements IEstadoListQueryHandler {
  constructor(
    @DeclareDependency(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute({ accessContext, dto }: IEstadoListQuery): Promise<EstadoListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
