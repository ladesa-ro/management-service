import { Inject, Injectable } from "@nestjs/common";
import {
  type IEstadoFindOneQuery,
  IEstadoFindOneQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import { ESTADO_REPOSITORY_PORT, type IEstadoRepositoryPort } from "../../../domain/repositories";
import type { EstadoFindOneOutputDto } from "../../dtos";

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
