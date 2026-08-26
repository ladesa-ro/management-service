import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { RelatorioFindOneQueryResult } from "../../domain/queries";
import { IRelatorioFindByEstagioQueryHandler } from "../../domain/queries/relatorio-find-by-estagio.query.handler.interface";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioFindByEstagioQueryHandlerImpl implements IRelatorioFindByEstagioQueryHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    estagioId: string,
  ): Promise<RelatorioFindOneQueryResult | null> {
    return this.repository.getFindByEstagioQueryResult(estagioId);
  }
}
