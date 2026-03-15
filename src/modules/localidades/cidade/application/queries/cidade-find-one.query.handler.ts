import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ICidadeFindOneQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import type { CidadeFindOneQuery, CidadeFindOneQueryResult } from "../../domain/queries";
import { ICidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CidadeFindOneQueryHandlerImpl implements ICidadeFindOneQueryHandler {
  constructor(
    @DeclareDependency(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: CidadeFindOneQuery,
  ): Promise<CidadeFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}
