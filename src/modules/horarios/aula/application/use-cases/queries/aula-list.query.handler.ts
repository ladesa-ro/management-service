import { Inject, Injectable } from "@nestjs/common";
import {
  type IAulaListQuery,
  IAulaListQueryHandler,
} from "@/modules/horarios/aula/domain/queries/aula-list.query.handler.interface";
import type { AulaListOutputDto } from "../../dtos";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../../ports";

@Injectable()
export class AulaListQueryHandlerImpl implements IAulaListQueryHandler {
  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    private readonly repository: IAulaRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: IAulaListQuery): Promise<AulaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
