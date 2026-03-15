import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IDiaCalendarioListQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import type { DiaCalendarioListQuery, DiaCalendarioListQueryResult } from "../../domain/queries";
import { IDiaCalendarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiaCalendarioListQueryHandlerImpl implements IDiaCalendarioListQueryHandler {
  constructor(
    @DeclareDependency(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiaCalendarioListQuery | null,
  ): Promise<DiaCalendarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
