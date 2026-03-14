import { Inject, Injectable } from "@nestjs/common";
import {
  type ICampusListQuery,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { CAMPUS_REPOSITORY_PORT, type ICampusRepositoryPort } from "../../../domain/repositories";
import type { CampusListOutputDto } from "../../dtos";

@Injectable()
export class CampusListQueryHandlerImpl implements ICampusListQueryHandler {
  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    private readonly repository: ICampusRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: ICampusListQuery): Promise<CampusListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
