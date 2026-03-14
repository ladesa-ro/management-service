import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoNivelFormacaoListQuery,
  IOfertaFormacaoNivelFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { OfertaFormacaoNivelFormacaoListOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoNivelFormacaoListQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoListQueryHandler
{
  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoNivelFormacaoListQuery): Promise<OfertaFormacaoNivelFormacaoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
