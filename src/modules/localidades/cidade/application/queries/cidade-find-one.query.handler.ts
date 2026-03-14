import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICidadeFindOneQuery,
  ICidadeFindOneQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import type { CidadeFindOneQueryResult } from "../../domain/queries";
import { ICidadeRepository } from "../../domain/repositories";
@DeclareImplementation()
export class CidadeFindOneQueryHandlerImpl implements ICidadeFindOneQueryHandler {
  constructor(
    @DeclareDependency(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ICidadeFindOneQuery): Promise<CidadeFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}
