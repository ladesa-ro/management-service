import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IBlocoListQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import type { BlocoListQuery, BlocoListQueryResult } from "../../domain/queries";
import { IBlocoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class BlocoListQueryHandlerImpl implements IBlocoListQueryHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: BlocoListQuery | null,
  ): Promise<BlocoListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
