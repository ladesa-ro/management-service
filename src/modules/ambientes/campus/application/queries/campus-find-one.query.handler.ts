import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { CampusFindOneQuery, CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@Impl()
export class CampusFindOneQueryHandlerImpl implements ICampusFindOneQueryHandler {
  constructor(
    @Dep(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CampusFindOneQuery,
  ): Promise<CampusFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
