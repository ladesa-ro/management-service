import { Inject, Injectable } from "@nestjs/common";
import {
  type ICampusFindOneQuery,
  ICampusFindOneQueryHandler,
} from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { ICampusRepository } from "../../domain/repositories";
import type { CampusFindOneOutputDto } from "../dtos";

@Injectable()
export class CampusFindOneQueryHandlerImpl implements ICampusFindOneQueryHandler {
  constructor(
    @Inject(ICampusRepository)
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
