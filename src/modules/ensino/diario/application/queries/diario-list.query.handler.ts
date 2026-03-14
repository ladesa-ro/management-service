import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiarioListQuery,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import type { DiarioListQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";
@DeclareImplementation()
export class DiarioListQueryHandlerImpl implements IDiarioListQueryHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioListQuery): Promise<DiarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
