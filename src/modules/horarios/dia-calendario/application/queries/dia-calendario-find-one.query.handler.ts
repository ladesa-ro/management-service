import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IDiaCalendarioFindOneQueryHandler } from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-find-one.query.handler.interface";
import type {
  DiaCalendarioFindOneQuery,
  DiaCalendarioFindOneQueryResult,
} from "../../domain/queries";
import { IDiaCalendarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiaCalendarioFindOneQueryHandlerImpl implements IDiaCalendarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiaCalendarioFindOneQuery,
  ): Promise<DiaCalendarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
