import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type {
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
} from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoFindOneQueryHandlerImpl implements INivelFormacaoFindOneQueryHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneQuery,
  ): Promise<NivelFormacaoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
