import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagioListQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EstagioListQuery, EstagioListQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioListQueryHandlerImpl implements IEstagioListQueryHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstagioListQuery | null,
  ): Promise<EstagioListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
