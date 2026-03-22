import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import type { AmbienteFindOneQuery, AmbienteFindOneQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteFindOneQueryHandlerImpl implements IAmbienteFindOneQueryHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: AmbienteFindOneQuery,
  ): Promise<AmbienteFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
