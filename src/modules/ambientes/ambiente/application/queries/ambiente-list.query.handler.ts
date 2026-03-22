import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAmbienteListQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { AmbienteListQuery, AmbienteListQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteListQueryHandlerImpl implements IAmbienteListQueryHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: AmbienteListQuery | null,
  ): Promise<AmbienteListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
