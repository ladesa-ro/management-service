import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { DiarioFindOneQuery, DiarioFindOneQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioFindOneQueryHandlerImpl implements IDiarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioFindOneQuery,
  ): Promise<DiarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
