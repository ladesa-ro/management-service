import { Inject, Injectable } from "@nestjs/common";
import {
  type ITurmaDisponibilidadeFindOneQuery,
  ITurmaDisponibilidadeFindOneQueryHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/queries/turma-disponibilidade-find-one.query.handler.interface";
import type { TurmaDisponibilidadeFindOneOutputDto } from "../../dtos";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class TurmaDisponibilidadeFindOneQueryHandlerImpl
  implements ITurmaDisponibilidadeFindOneQueryHandler
{
  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: ITurmaDisponibilidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ITurmaDisponibilidadeFindOneQuery): Promise<TurmaDisponibilidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
