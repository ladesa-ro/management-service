import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IEstadoListQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import type { EstadoListQuery, EstadoListQueryResult } from "../../domain/queries";
import { IEstadoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstadoListQueryHandler implements IEstadoListQueryHandler {
  constructor(
    @DeclareDependency(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstadoListQuery | null,
  ): Promise<EstadoListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
