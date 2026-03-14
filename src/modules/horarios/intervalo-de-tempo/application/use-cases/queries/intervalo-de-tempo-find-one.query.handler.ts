import { Inject, Injectable } from "@nestjs/common";
import {
  type IIntervaloDeTempoFindOneQuery,
  IIntervaloDeTempoFindOneQueryHandler,
} from "@/modules/horarios/intervalo-de-tempo/domain/queries/intervalo-de-tempo-find-one.query.handler.interface";
import type { IntervaloDeTempoFindOneOutputDto } from "../../dtos";
import {
  type IIntervaloDeTempoRepositoryPort,
  INTERVALO_DE_TEMPO_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class IntervaloDeTempoFindOneQueryHandlerImpl
  implements IIntervaloDeTempoFindOneQueryHandler
{
  constructor(
    @Inject(INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IIntervaloDeTempoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IIntervaloDeTempoFindOneQuery): Promise<IntervaloDeTempoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
