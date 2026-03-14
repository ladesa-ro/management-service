import { Inject, Injectable } from "@nestjs/common";
import {
  type IDisponibilidadeFindOneQuery,
  IDisponibilidadeFindOneQueryHandler,
} from "@/modules/ensino/disponibilidade/domain/queries/disponibilidade-find-one.query.handler.interface";
import type { DisponibilidadeFindOneOutputDto } from "../../dtos";
import { DISPONIBILIDADE_REPOSITORY_PORT, type IDisponibilidadeRepositoryPort } from "../../ports";

@Injectable()
export class DisponibilidadeFindOneQueryHandlerImpl implements IDisponibilidadeFindOneQueryHandler {
  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IDisponibilidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisponibilidadeFindOneQuery): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
