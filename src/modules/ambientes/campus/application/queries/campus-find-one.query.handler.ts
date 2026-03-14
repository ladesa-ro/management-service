import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICampusFindOneQuery,
  ICampusFindOneQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusFindOneQueryHandlerImpl implements ICampusFindOneQueryHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICampusFindOneQuery): Promise<CampusFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
