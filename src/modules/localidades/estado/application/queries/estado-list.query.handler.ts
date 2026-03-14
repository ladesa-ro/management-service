import { Inject, Injectable } from "@nestjs/common";
import {
  type IEstadoListQuery,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import { IEstadoRepository } from "../../domain/repositories";
import type { EstadoListOutputDto } from "../dtos";

@Injectable()
export class EstadoListQueryHandlerImpl implements IEstadoListQueryHandler {
  constructor(
    @Inject(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute({ accessContext, dto }: IEstadoListQuery): Promise<EstadoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
