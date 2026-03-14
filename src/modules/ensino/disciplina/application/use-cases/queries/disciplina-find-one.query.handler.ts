import { Inject, Injectable } from "@nestjs/common";
import {
  type IDisciplinaFindOneQuery,
  IDisciplinaFindOneQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { IDisciplinaRepository } from "../../../domain/repositories";
import type { DisciplinaFindOneOutputDto } from "../../dtos";

@Injectable()
export class DisciplinaFindOneQueryHandlerImpl implements IDisciplinaFindOneQueryHandler {
  constructor(
    @Inject(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisciplinaFindOneQuery): Promise<DisciplinaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
