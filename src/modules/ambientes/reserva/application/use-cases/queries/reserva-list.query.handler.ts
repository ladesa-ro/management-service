import { Inject, Injectable } from "@nestjs/common";
import {
  type IReservaListQuery,
  IReservaListQueryHandler,
} from "@/modules/ambientes/reserva/domain/queries/reserva-list.query.handler.interface";
import type { ReservaListOutputDto } from "../../dtos";
import { type IReservaRepositoryPort, RESERVA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ReservaListQueryHandlerImpl implements IReservaListQueryHandler {
  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    private readonly repository: IReservaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IReservaListQuery): Promise<ReservaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
