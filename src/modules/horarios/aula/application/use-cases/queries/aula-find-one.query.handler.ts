import { Inject, Injectable } from "@nestjs/common";
import {
  type IAulaFindOneQuery,
  IAulaFindOneQueryHandler,
} from "@/modules/horarios/aula/domain/queries/aula-find-one.query.handler.interface";
import type { AulaFindOneOutputDto } from "../../dtos";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../../ports";

@Injectable()
export class AulaFindOneQueryHandlerImpl implements IAulaFindOneQueryHandler {
  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    private readonly repository: IAulaRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAulaFindOneQuery): Promise<AulaFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
