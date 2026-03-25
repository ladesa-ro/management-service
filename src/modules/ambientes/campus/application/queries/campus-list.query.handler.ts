import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import type { CampusListQuery, CampusListQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusListQueryHandlerImpl implements ICampusListQueryHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CampusListQuery | null,
  ): Promise<CampusListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
