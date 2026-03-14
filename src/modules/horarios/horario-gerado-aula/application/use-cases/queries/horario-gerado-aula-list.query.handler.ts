import { Inject, Injectable } from "@nestjs/common";
import {
  type IHorarioGeradoAulaListQuery,
  IHorarioGeradoAulaListQueryHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/queries/horario-gerado-aula-list.query.handler.interface";
import type { HorarioGeradoAulaListOutputDto } from "../../dtos";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../../ports";

@Injectable()
export class HorarioGeradoAulaListQueryHandlerImpl implements IHorarioGeradoAulaListQueryHandler {
  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoAulaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IHorarioGeradoAulaListQuery): Promise<HorarioGeradoAulaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
