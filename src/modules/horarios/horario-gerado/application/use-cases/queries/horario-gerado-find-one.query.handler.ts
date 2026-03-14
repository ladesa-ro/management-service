import { Inject, Injectable } from "@nestjs/common";
import {
  type IHorarioGeradoFindOneQuery,
  IHorarioGeradoFindOneQueryHandler,
} from "@/modules/horarios/horario-gerado/domain/queries/horario-gerado-find-one.query.handler.interface";
import type { HorarioGeradoFindOneOutputDto } from "../../dtos";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../../ports";

@Injectable()
export class HorarioGeradoFindOneQueryHandlerImpl implements IHorarioGeradoFindOneQueryHandler {
  constructor(
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IHorarioGeradoFindOneQuery): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
