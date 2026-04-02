import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { DiarioFindOneQuery, DiarioFindOneQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@Impl()
export class DiarioFindOneQueryHandlerImpl implements IDiarioFindOneQueryHandler {
  constructor(
    @Dep(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioFindOneQuery,
  ): Promise<DiarioFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
