import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiaCalendarioListQuery,
  IDiaCalendarioListQueryHandler,
} from "@/modules/horarios/dia-calendario/domain/queries/dia-calendario-list.query.handler.interface";
import type { DiaCalendarioListOutputDto } from "../../dtos";
import { DIA_CALENDARIO_REPOSITORY_PORT, type IDiaCalendarioRepositoryPort } from "../../ports";

@Injectable()
export class DiaCalendarioListQueryHandlerImpl implements IDiaCalendarioListQueryHandler {
  constructor(
    @Inject(DIA_CALENDARIO_REPOSITORY_PORT)
    private readonly repository: IDiaCalendarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiaCalendarioListQuery): Promise<DiaCalendarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
