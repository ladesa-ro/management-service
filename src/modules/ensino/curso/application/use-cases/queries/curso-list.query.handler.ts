import { Inject, Injectable } from "@nestjs/common";
import {
  type ICursoListQuery,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../../domain/repositories";
import type { CursoListOutputDto } from "../../dtos";

@Injectable()
export class CursoListQueryHandlerImpl implements ICursoListQueryHandler {
  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    private readonly repository: ICursoRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: ICursoListQuery): Promise<CursoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
