import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import type { CampusListQuery, CampusListQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@Impl()
export class CampusListQueryHandlerImpl implements ICampusListQueryHandler {
  constructor(
    @Dep(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CampusListQuery | null,
  ): Promise<CampusListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
