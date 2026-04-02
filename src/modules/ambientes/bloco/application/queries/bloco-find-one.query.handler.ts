import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import type { BlocoFindOneQuery, BlocoFindOneQueryResult } from "../../domain/queries";
import { IBlocoRepository } from "../../domain/repositories";

@Impl()
export class BlocoFindOneQueryHandlerImpl implements IBlocoFindOneQueryHandler {
  constructor(
    @Dep(IBlocoRepository)
    private readonly repository: IBlocoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: BlocoFindOneQuery,
  ): Promise<BlocoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
