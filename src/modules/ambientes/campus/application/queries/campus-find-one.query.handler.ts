import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICampusFindOneQuery,
  ICampusFindOneQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { ICampusRepository } from "../../domain/repositories";
import type { CampusFindOneOutputDto } from "../dtos";

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
  }: ICampusFindOneQuery): Promise<CampusFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
