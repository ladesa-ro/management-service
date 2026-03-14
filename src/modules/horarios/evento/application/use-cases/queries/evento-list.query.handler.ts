import { Inject, Injectable } from "@nestjs/common";
import {
  type IEventoListQuery,
  IEventoListQueryHandler,
} from "@/modules/horarios/evento/domain/queries/evento-list.query.handler.interface";
import type { EventoListOutputDto } from "../../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../../ports";

@Injectable()
export class EventoListQueryHandlerImpl implements IEventoListQueryHandler {
  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    private readonly repository: IEventoRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: IEventoListQuery): Promise<EventoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
