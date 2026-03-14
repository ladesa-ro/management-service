import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAmbienteListQuery,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import { IAmbienteRepository } from "../../domain/repositories";
import type { AmbienteListOutputDto } from "../dtos";

@DeclareImplementation()
export class AmbienteListQueryHandlerImpl implements IAmbienteListQueryHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAmbienteListQuery): Promise<AmbienteListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
