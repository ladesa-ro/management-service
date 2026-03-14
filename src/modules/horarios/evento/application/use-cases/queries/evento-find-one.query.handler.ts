import { Inject, Injectable } from "@nestjs/common";
import {
  type IEventoFindOneQuery,
  IEventoFindOneQueryHandler,
} from "@/modules/horarios/evento/domain/queries/evento-find-one.query.handler.interface";
import type { EventoFindOneOutputDto } from "../../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../../ports";

@Injectable()
export class EventoFindOneQueryHandlerImpl implements IEventoFindOneQueryHandler {
  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    private readonly repository: IEventoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEventoFindOneQuery): Promise<EventoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
