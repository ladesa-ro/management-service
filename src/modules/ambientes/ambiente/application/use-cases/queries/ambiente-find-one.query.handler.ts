import { Inject, Injectable } from "@nestjs/common";
import {
  type IAmbienteFindOneQuery,
  IAmbienteFindOneQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
} from "../../../domain/repositories";
import type { AmbienteFindOneOutputDto } from "../../dtos";

@Injectable()
export class AmbienteFindOneQueryHandlerImpl implements IAmbienteFindOneQueryHandler {
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IAmbienteFindOneQuery): Promise<AmbienteFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
