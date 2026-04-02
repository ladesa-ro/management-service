import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDiarioListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import type { DiarioListQuery, DiarioListQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@Impl()
export class DiarioListQueryHandlerImpl implements IDiarioListQueryHandler {
  constructor(
    @Dep(IDiarioRepository)
    private readonly repository: IDiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioListQuery | null,
  ): Promise<DiarioListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
