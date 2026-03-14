import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioProfessorFindOneQuery,
  IDiarioProfessorFindOneQueryHandler,
} from "@/modules/ensino/diario-professor/domain/queries/diario-professor-find-one.query.handler.interface";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";
import { DIARIO_PROFESSOR_REPOSITORY_PORT, type IDiarioProfessorRepositoryPort } from "../../ports";

@Injectable()
export class DiarioProfessorFindOneQueryHandlerImpl implements IDiarioProfessorFindOneQueryHandler {
  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    private readonly repository: IDiarioProfessorRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioProfessorFindOneQuery): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
