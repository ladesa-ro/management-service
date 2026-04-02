import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import type {
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
} from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@Impl()
export class NivelFormacaoFindOneQueryHandlerImpl implements INivelFormacaoFindOneQueryHandler {
  constructor(
    @Dep(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoFindOneQuery,
  ): Promise<NivelFormacaoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
