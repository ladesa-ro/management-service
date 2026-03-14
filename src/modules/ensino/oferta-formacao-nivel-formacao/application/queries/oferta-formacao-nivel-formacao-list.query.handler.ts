import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IOfertaFormacaoNivelFormacaoListQuery,
  IOfertaFormacaoNivelFormacaoListQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";
import type { OfertaFormacaoNivelFormacaoListOutputDto } from "../dtos";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoListQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoListQueryHandler
{
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
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
