import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoListQuery,
  IOfertaFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import type { OfertaFormacaoListOutputDto } from "../../dtos";
import { type IOfertaFormacaoRepositoryPort, OFERTA_FORMACAO_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class OfertaFormacaoListQueryHandlerImpl implements IOfertaFormacaoListQueryHandler {
  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoListQuery): Promise<OfertaFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
