import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { CampusFindOneQuery, CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusFindOneQueryHandlerImpl implements ICampusFindOneQueryHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CampusFindOneQuery,
  ): Promise<CampusFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
