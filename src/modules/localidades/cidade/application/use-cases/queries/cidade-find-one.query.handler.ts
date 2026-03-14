import { Inject, Injectable } from "@nestjs/common";
import {
  type ICidadeFindOneQuery,
  ICidadeFindOneQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import type { CidadeFindOneOutputDto } from "../../dtos";
import { CIDADE_REPOSITORY_PORT, type ICidadeRepositoryPort } from "../../ports";

@Injectable()
export class CidadeFindOneQueryHandlerImpl implements ICidadeFindOneQueryHandler {
  constructor(
    @Inject(CIDADE_REPOSITORY_PORT)
    private readonly repository: ICidadeRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ICidadeFindOneQuery): Promise<CidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
