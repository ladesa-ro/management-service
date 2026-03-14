import { Inject, Injectable } from "@nestjs/common";
import {
  type IAmbienteFindOneQuery,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { IAmbienteRepository } from "../../domain/repositories";
import type { AmbienteFindOneOutputDto } from "../dtos";

@Injectable()
export class AmbienteFindOneQueryHandlerImpl implements IAmbienteFindOneQueryHandler {
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAmbienteFindOneQuery): Promise<AmbienteFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
