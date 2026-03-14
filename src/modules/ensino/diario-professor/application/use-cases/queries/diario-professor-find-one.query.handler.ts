import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioProfessorFindOneQuery,
  IDiarioProfessorFindOneQueryHandler,
} from "@/modules/ensino/diario-professor/domain/queries/diario-professor-find-one.query.handler.interface";
import { IDiarioProfessorRepository } from "../../../domain/repositories";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioProfessorFindOneQueryHandlerImpl implements IDiarioProfessorFindOneQueryHandler {
  constructor(
    @Inject(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioProfessorFindOneQuery): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
