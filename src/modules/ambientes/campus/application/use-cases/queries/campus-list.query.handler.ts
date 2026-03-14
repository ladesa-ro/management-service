import { Inject, Injectable } from "@nestjs/common";
import {
  type ICampusListQuery,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { ICampusRepository } from "../../../domain/repositories";
import type { CampusListOutputDto } from "../../dtos";

@Injectable()
export class CampusListQueryHandlerImpl implements ICampusListQueryHandler {
  constructor(
    @Inject(ICampusRepository)
    private readonly repository: ICampusRepository,
  ) {}

  async execute({ accessContext, dto, selection }: ICampusListQuery): Promise<CampusListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
