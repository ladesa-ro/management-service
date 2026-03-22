import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagioFindOneQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EstagioFindOneQuery, EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioFindOneQueryHandlerImpl implements IEstagioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstagioFindOneQuery,
  ): Promise<EstagioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
