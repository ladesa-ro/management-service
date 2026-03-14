import { Inject, Injectable } from "@nestjs/common";
import {
  type ITurmaFindOneQuery,
  ITurmaFindOneQueryHandler,
} from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ITurmaRepository } from "../../../domain/repositories";
import type { TurmaFindOneOutputDto } from "../../dtos";

@Injectable()
export class TurmaFindOneQueryHandlerImpl implements ITurmaFindOneQueryHandler {
  constructor(
    @Inject(ITurmaRepository)
    private readonly repository: ITurmaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ITurmaFindOneQuery): Promise<TurmaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
