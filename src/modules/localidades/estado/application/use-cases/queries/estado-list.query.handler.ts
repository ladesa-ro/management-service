import { Inject, Injectable } from "@nestjs/common";
import {
  type IEstadoListQuery,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import { ESTADO_REPOSITORY_PORT, type IEstadoRepositoryPort } from "../../../domain/repositories";
import type { EstadoListOutputDto } from "../../dtos";

@Injectable()
export class EstadoListQueryHandlerImpl implements IEstadoListQueryHandler {
  constructor(
    @Inject(ESTADO_REPOSITORY_PORT)
    private readonly repository: IEstadoRepositoryPort,
  ) {}

  async execute({ accessContext, dto }: IEstadoListQuery): Promise<EstadoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
