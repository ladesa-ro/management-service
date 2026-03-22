import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDiarioListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { DiarioListQuery, DiarioListQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioListQueryHandlerImpl implements IDiarioListQueryHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioListQuery | null,
  ): Promise<DiarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
