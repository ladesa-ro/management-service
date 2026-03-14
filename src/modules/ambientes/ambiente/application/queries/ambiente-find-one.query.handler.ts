import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAmbienteFindOneQuery,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { IAmbienteRepository } from "../../domain/repositories";
import type { AmbienteFindOneOutputDto } from "../dtos";

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
  }: IAmbienteFindOneQuery): Promise<AmbienteFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
