import { Inject, Injectable } from "@nestjs/common";
import {
  type INivelFormacaoFindOneQuery,
  INivelFormacaoFindOneQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { INivelFormacaoRepository } from "../../../domain/repositories";
import type { NivelFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class NivelFormacaoFindOneQueryHandlerImpl implements INivelFormacaoFindOneQueryHandler {
  constructor(
    @Inject(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoFindOneQuery): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
