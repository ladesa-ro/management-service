import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { INivelFormacaoListQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import type { NivelFormacaoListQuery, NivelFormacaoListQueryResult } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoListQueryHandlerImpl implements INivelFormacaoListQueryHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: NivelFormacaoListQuery | null,
  ): Promise<NivelFormacaoListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
