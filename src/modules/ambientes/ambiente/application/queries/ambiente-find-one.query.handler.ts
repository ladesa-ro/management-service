import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import type { AmbienteFindOneQuery, AmbienteFindOneQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@Impl()
export class AmbienteFindOneQueryHandlerImpl implements IAmbienteFindOneQueryHandler {
  constructor(
    @Dep(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: AmbienteFindOneQuery,
  ): Promise<AmbienteFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
