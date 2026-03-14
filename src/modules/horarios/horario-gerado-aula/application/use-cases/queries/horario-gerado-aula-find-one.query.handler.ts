import { Inject, Injectable } from "@nestjs/common";
import {
  type IHorarioGeradoAulaFindOneQuery,
  IHorarioGeradoAulaFindOneQueryHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/queries/horario-gerado-aula-find-one.query.handler.interface";
import type { HorarioGeradoAulaFindOneOutputDto } from "../../dtos";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../../ports";

@Injectable()
export class HorarioGeradoAulaFindOneQueryHandlerImpl
  implements IHorarioGeradoAulaFindOneQueryHandler
{
  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoAulaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IHorarioGeradoAulaFindOneQuery): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
