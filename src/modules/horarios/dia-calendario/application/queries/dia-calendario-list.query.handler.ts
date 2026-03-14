import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiaCalendarioListQuery,
  IDiaCalendarioListQueryHandler,
} from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import { IDiaCalendarioRepository } from "../../domain/repositories";
import type { DiaCalendarioListOutputDto } from "../dtos";

@DeclareImplementation()
export class DiaCalendarioListQueryHandlerImpl implements IDiaCalendarioListQueryHandler {
  constructor(
    @DeclareDependency(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiaCalendarioListQuery): Promise<DiaCalendarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
