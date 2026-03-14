import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IBlocoFindOneQuery,
  IBlocoFindOneQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import type { BlocoFindOneQueryResult } from "../../domain/queries";
import { IBlocoRepository } from "../../domain/repositories";
@DeclareImplementation()
export class BlocoFindOneQueryHandlerImpl implements IBlocoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IBlocoFindOneQuery): Promise<BlocoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
