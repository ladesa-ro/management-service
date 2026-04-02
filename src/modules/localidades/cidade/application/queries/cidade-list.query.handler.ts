import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICidadeListQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import type { CidadeListQuery, CidadeListQueryResult } from "../../domain/queries";
import { ICidadeRepository } from "../../domain/repositories";

@Impl()
export class CidadeListQueryHandlerImpl implements ICidadeListQueryHandler {
  constructor(
    @Dep(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CidadeListQuery | null,
  ): Promise<CidadeListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
