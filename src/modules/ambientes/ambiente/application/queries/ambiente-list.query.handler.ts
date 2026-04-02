import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAmbienteListQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import type { AmbienteListQuery, AmbienteListQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@Impl()
export class AmbienteListQueryHandlerImpl implements IAmbienteListQueryHandler {
  constructor(
    @Dep(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: AmbienteListQuery | null,
  ): Promise<AmbienteListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
