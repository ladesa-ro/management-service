import { Inject, Injectable } from "@nestjs/common";
import {
  type IReservaFindOneQuery,
  IReservaFindOneQueryHandler,
} from "@/modules/ambientes/reserva/domain/queries/reserva-find-one.query.handler.interface";
import type { ReservaFindOneOutputDto } from "../../dtos";
import { type IReservaRepositoryPort, RESERVA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ReservaFindOneQueryHandlerImpl implements IReservaFindOneQueryHandler {
  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    private readonly repository: IReservaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IReservaFindOneQuery): Promise<ReservaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
