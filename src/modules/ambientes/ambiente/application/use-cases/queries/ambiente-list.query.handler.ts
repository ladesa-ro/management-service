import { Inject, Injectable } from "@nestjs/common";
import {
  type IAmbienteListQuery,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
} from "../../../domain/repositories";
import type { AmbienteListOutputDto } from "../../dtos";

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
