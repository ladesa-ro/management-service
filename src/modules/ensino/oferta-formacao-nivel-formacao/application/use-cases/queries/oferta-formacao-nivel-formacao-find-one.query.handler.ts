import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoNivelFormacaoFindOneQuery,
  IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-find-one.query.handler.interface";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../../dtos";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoFindOneQueryHandler
{
  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoNivelFormacaoFindOneQuery): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
