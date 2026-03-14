import { Inject, Injectable } from "@nestjs/common";
import {
  type ITurmaListQuery,
  ITurmaListQueryHandler,
} from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../../domain/repositories";
import type { TurmaListOutputDto } from "../../dtos";

@Injectable()
export class TurmaListQueryHandlerImpl implements ITurmaListQueryHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: ITurmaListQuery): Promise<TurmaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
