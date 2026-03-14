import { Inject, Injectable } from "@nestjs/common";
import {
  type INivelFormacaoListQuery,
  INivelFormacaoListQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import { INivelFormacaoRepository } from "../../domain/repositories";
import type { NivelFormacaoListOutputDto } from "../dtos";

@Injectable()
export class NivelFormacaoListQueryHandlerImpl implements INivelFormacaoListQueryHandler {
  constructor(
    @Inject(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoListQuery): Promise<NivelFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
