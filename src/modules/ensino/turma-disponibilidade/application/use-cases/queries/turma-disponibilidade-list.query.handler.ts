import { Inject, Injectable } from "@nestjs/common";
import {
  type ITurmaDisponibilidadeListQuery,
  ITurmaDisponibilidadeListQueryHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/queries/turma-disponibilidade-list.query.handler.interface";
import type { TurmaDisponibilidadeListOutputDto } from "../../dtos";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class TurmaDisponibilidadeListQueryHandlerImpl
  implements ITurmaDisponibilidadeListQueryHandler
{
  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: ITurmaDisponibilidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ITurmaDisponibilidadeListQuery): Promise<TurmaDisponibilidadeListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
