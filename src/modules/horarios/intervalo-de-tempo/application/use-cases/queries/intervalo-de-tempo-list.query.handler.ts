import { Inject, Injectable } from "@nestjs/common";
import {
  type IIntervaloDeTempoListQuery,
  IIntervaloDeTempoListQueryHandler,
} from "@/modules/horarios/intervalo-de-tempo/domain/queries/intervalo-de-tempo-list.query.handler.interface";
import type { IntervaloDeTempoListOutputDto } from "../../dtos";
import {
  type IIntervaloDeTempoRepositoryPort,
  INTERVALO_DE_TEMPO_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class IntervaloDeTempoListQueryHandlerImpl implements IIntervaloDeTempoListQueryHandler {
  constructor(
    @Inject(INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IIntervaloDeTempoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IIntervaloDeTempoListQuery): Promise<IntervaloDeTempoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
