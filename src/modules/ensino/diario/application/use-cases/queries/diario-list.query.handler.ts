import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioListQuery,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import type { DiarioListOutputDto } from "../../dtos";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../ports";

@Injectable()
export class DiarioListQueryHandlerImpl implements IDiarioListQueryHandler {
  constructor(
    @Inject(DIARIO_REPOSITORY_PORT)
    private readonly repository: IDiarioRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: IDiarioListQuery): Promise<DiarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
