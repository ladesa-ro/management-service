import { Inject, Injectable } from "@nestjs/common";
import {
  type IDiarioFindOneQuery,
  IDiarioFindOneQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../../domain/repositories";
import type { DiarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioFindOneQueryHandlerImpl implements IDiarioFindOneQueryHandler {
  constructor(
    @Inject(DIARIO_REPOSITORY_PORT)
    private readonly repository: IDiarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioFindOneQuery): Promise<DiarioFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
