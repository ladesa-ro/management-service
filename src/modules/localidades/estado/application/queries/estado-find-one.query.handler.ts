import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IEstadoFindOneQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import type { EstadoFindOneQuery, EstadoFindOneQueryResult } from "../../domain/queries";
import { IEstadoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstadoFindOneQueryHandler implements IEstadoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstadoFindOneQuery,
  ): Promise<EstadoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}
