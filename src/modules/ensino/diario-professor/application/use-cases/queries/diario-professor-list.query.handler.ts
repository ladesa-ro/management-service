import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioProfessorListQuery,
  IDiarioProfessorListQueryHandler,
} from "@/modules/ensino/diario-professor/domain/queries/diario-professor-list.query.handler.interface";
import type { DiarioProfessorListOutputDto } from "../../dtos";
import { DIARIO_PROFESSOR_REPOSITORY_PORT, type IDiarioProfessorRepositoryPort } from "../../ports";

@Injectable()
export class DiarioProfessorListQueryHandlerImpl implements IDiarioProfessorListQueryHandler {
  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    private readonly repository: IDiarioProfessorRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioProfessorListQuery): Promise<DiarioProfessorListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
