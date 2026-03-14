import { Inject, Injectable } from "@nestjs/common";
import {
  type IEstadoFindOneQuery,
  IEstadoFindOneQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import type { EstadoFindOneOutputDto } from "../../dtos";
import { ESTADO_REPOSITORY_PORT, type IEstadoRepositoryPort } from "../../ports";

@Injectable()
export class EstadoFindOneQueryHandlerImpl implements IEstadoFindOneQueryHandler {
  constructor(
    @Inject(ESTADO_REPOSITORY_PORT)
    private readonly repository: IEstadoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IEstadoFindOneQuery): Promise<EstadoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
