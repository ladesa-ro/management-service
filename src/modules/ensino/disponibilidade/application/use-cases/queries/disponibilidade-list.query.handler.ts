import { Inject, Injectable } from "@nestjs/common";
import {
  type IDisponibilidadeListQuery,
  IDisponibilidadeListQueryHandler,
} from "@/modules/ensino/disponibilidade/domain/queries/disponibilidade-list.query.handler.interface";
import type { DisponibilidadeListOutputDto } from "../../dtos";
import { DISPONIBILIDADE_REPOSITORY_PORT, type IDisponibilidadeRepositoryPort } from "../../ports";

@Injectable()
export class DisponibilidadeListQueryHandlerImpl implements IDisponibilidadeListQueryHandler {
  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IDisponibilidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisponibilidadeListQuery): Promise<DisponibilidadeListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
