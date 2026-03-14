import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoNivelFormacaoListQuery,
  IOfertaFormacaoNivelFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../../domain/repositories";
import type { OfertaFormacaoNivelFormacaoListOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoNivelFormacaoListQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoListQueryHandler
{
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoNivelFormacaoListQuery): Promise<OfertaFormacaoNivelFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
