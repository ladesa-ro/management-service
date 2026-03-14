import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoFindOneQuery,
  IOfertaFormacaoFindOneQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoRepository } from "../../domain/repositories";
import type { OfertaFormacaoFindOneOutputDto } from "../dtos";

@Injectable()
export class OfertaFormacaoFindOneQueryHandlerImpl implements IOfertaFormacaoFindOneQueryHandler {
  constructor(
    @Inject(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoFindOneQuery): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
