import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IHorariosDeAulaFindAtualQueryHandler } from "@/modules/horarios/horarios-de-aula/domain/queries/horarios-de-aula-find-atual.query.handler.interface";
import type {
  HorariosDeAulaFindAtualQuery,
  HorariosDeAulaFindAtualQueryResult,
} from "../../domain/queries";
import { IHorarioAulaConfiguracaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class HorariosDeAulaFindAtualQueryHandlerImpl
  implements IHorariosDeAulaFindAtualQueryHandler
{
  constructor(
    @DeclareDependency(IHorarioAulaConfiguracaoRepository)
    private readonly repository: IHorarioAulaConfiguracaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: HorariosDeAulaFindAtualQuery,
  ): Promise<HorariosDeAulaFindAtualQueryResult> {
    return this.repository.getFindAtualQueryResult(accessContext, query);
  }
}
