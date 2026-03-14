import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICampusListQuery,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { ICampusRepository } from "../../domain/repositories";
import type { CampusListOutputDto } from "../dtos";

@DeclareImplementation()
export class CampusListQueryHandlerImpl implements ICampusListQueryHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute({ accessContext, dto, selection }: ICampusListQuery): Promise<CampusListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
