import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IOfertaFormacaoNivelFormacaoFindOneQuery,
  IOfertaFormacaoNivelFormacaoFindOneQueryHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries/oferta-formacao-nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoFindOneQueryHandler
{
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoNivelFormacaoFindOneQuery): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
