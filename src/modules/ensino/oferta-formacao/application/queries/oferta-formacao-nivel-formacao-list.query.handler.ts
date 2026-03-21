import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  OfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoListQueryResult,
} from "../../domain/queries";
import { IOfertaFormacaoNivelFormacaoListQueryHandler } from "../../domain/queries/oferta-formacao-nivel-formacao-list.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoListQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoListQueryHandler
{
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoListQuery | null,
  ): Promise<OfertaFormacaoNivelFormacaoListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
