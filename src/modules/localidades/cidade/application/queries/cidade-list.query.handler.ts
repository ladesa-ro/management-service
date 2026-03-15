import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ICidadeListQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import type { CidadeListQuery, CidadeListQueryResult } from "../../domain/queries";
import { ICidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CidadeListQueryHandlerImpl implements ICidadeListQueryHandler {
  constructor(
    @DeclareDependency(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: CidadeListQuery | null,
  ): Promise<CidadeListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
