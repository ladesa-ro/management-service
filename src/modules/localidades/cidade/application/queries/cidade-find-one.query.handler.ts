import { Inject, Injectable } from "@nestjs/common";
import {
  type ICidadeFindOneQuery,
  ICidadeFindOneQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import { ICidadeRepository } from "../../domain/repositories";
import type { CidadeFindOneOutputDto } from "../dtos";

@Injectable()
export class CidadeFindOneQueryHandlerImpl implements ICidadeFindOneQueryHandler {
  constructor(
    @Inject(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ICidadeFindOneQuery): Promise<CidadeFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
