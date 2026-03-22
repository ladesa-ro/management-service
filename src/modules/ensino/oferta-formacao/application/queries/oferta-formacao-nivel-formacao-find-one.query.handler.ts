import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/server/access-context";
import type {
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
} from "../../domain/queries";
import { IOfertaFormacaoNivelFormacaoFindOneQueryHandler } from "../../domain/queries/oferta-formacao-nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoFindOneQueryHandlerImpl
  implements IOfertaFormacaoNivelFormacaoFindOneQueryHandler
{
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoFindOneQuery,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
