import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { INivelFormacaoListQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import type { NivelFormacaoListQuery, NivelFormacaoListQueryResult } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@Impl()
export class NivelFormacaoListQueryHandlerImpl implements INivelFormacaoListQueryHandler {
  constructor(
    @Dep(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoListQuery | null,
  ): Promise<NivelFormacaoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
