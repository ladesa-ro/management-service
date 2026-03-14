import { Inject, Injectable } from "@nestjs/common";
import {
  type IAmbienteListQuery,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import type { AmbienteListOutputDto } from "../../dtos";
import { AMBIENTE_REPOSITORY_PORT, type IAmbienteRepositoryPort } from "../../ports";

@Injectable()
export class AmbienteListQueryHandlerImpl implements IAmbienteListQueryHandler {
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAmbienteListQuery): Promise<AmbienteListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
