import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAmbienteFindOneQuery,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import type { AmbienteFindOneQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";
@DeclareImplementation()
export class AmbienteFindOneQueryHandlerImpl implements IAmbienteFindOneQueryHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAmbienteFindOneQuery): Promise<AmbienteFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
