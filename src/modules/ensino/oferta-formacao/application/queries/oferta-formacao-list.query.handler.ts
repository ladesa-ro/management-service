import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoListQuery,
  IOfertaFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import { IOfertaFormacaoRepository } from "../../domain/repositories";
import type { OfertaFormacaoListOutputDto } from "../dtos";

@Injectable()
export class OfertaFormacaoListQueryHandlerImpl implements IOfertaFormacaoListQueryHandler {
  constructor(
    @Inject(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoListQuery): Promise<OfertaFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
