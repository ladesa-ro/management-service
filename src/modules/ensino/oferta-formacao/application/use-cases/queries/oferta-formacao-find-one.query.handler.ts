import { Inject, Injectable } from "@nestjs/common";
import {
  type IOfertaFormacaoFindOneQuery,
  IOfertaFormacaoFindOneQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  type IOfertaFormacaoRepositoryPort,
  OFERTA_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { OfertaFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoFindOneQueryHandlerImpl implements IOfertaFormacaoFindOneQueryHandler {
  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoFindOneQuery): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
