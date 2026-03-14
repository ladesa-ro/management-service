import { Inject, Injectable } from "@nestjs/common";
import {
  type IHorarioGeradoListQuery,
  IHorarioGeradoListQueryHandler,
} from "@/modules/horarios/horario-gerado/domain/queries/horario-gerado-list.query.handler.interface";
import type { HorarioGeradoListOutputDto } from "../../dtos";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../../ports";

@Injectable()
export class HorarioGeradoListQueryHandlerImpl implements IHorarioGeradoListQueryHandler {
  constructor(
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IHorarioGeradoListQuery): Promise<HorarioGeradoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
