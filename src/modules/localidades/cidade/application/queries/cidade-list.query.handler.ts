import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICidadeListQuery,
  ICidadeListQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import type { CidadeListQueryResult } from "../../domain/queries";
import { ICidadeRepository } from "../../domain/repositories";
@DeclareImplementation()
export class CidadeListQueryHandlerImpl implements ICidadeListQueryHandler {
  constructor(
    @DeclareDependency(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute({ accessContext, dto }: ICidadeListQuery): Promise<CidadeListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
