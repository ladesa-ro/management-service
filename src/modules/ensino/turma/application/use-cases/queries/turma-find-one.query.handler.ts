import { Inject, Injectable } from "@nestjs/common";
import {
  type ITurmaFindOneQuery,
  ITurmaFindOneQueryHandler,
} from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../../domain/repositories";
import type { TurmaFindOneOutputDto } from "../../dtos";

@Injectable()
export class TurmaFindOneQueryHandlerImpl implements ITurmaFindOneQueryHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ITurmaFindOneQuery): Promise<TurmaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
