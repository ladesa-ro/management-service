import { Inject, Injectable } from "@nestjs/common";
import {
  type ITurmaListQuery,
  ITurmaListQueryHandler,
} from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { ITurmaRepository } from "../../../domain/repositories";
import type { TurmaListOutputDto } from "../../dtos";

@Injectable()
export class TurmaListQueryHandlerImpl implements ITurmaListQueryHandler {
  constructor(
    @Inject(ITurmaRepository)
    private readonly repository: ITurmaRepository,
  ) {}

  async execute({ accessContext, dto, selection }: ITurmaListQuery): Promise<TurmaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
