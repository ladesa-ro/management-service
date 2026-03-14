import { Inject, Injectable } from "@nestjs/common";
import {
  type IAmbienteListQuery,
  IAmbienteListQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import { IAmbienteRepository } from "../../domain/repositories";
import type { AmbienteListOutputDto } from "../dtos";

@Injectable()
export class AmbienteListQueryHandlerImpl implements IAmbienteListQueryHandler {
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAmbienteListQuery): Promise<AmbienteListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
