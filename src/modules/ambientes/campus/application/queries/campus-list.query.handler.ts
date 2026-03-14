import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICampusListQuery,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import type { CampusListQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusListQueryHandlerImpl implements ICampusListQueryHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICampusListQuery): Promise<CampusListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
