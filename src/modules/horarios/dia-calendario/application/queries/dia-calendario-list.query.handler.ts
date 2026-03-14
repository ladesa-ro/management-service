import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiaCalendarioListQuery,
  IDiaCalendarioListQueryHandler,
} from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import type { DiaCalendarioListQueryResult } from "../../domain/queries";
import { IDiaCalendarioRepository } from "../../domain/repositories";
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
  }: IDiaCalendarioListQuery): Promise<DiaCalendarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
