import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiarioFindOneQuery,
  IDiarioFindOneQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { DiarioFindOneQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";
@DeclareImplementation()
export class DiarioFindOneQueryHandlerImpl implements IDiarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioFindOneQuery): Promise<DiarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
