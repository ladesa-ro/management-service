import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagiarioFindOneQueryHandler } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import type { EstagiarioFindOneQuery, EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@Impl()
export class EstagiarioFindOneQueryHandlerImpl implements IEstagiarioFindOneQueryHandler {
  constructor(
    @Dep(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagiarioFindOneQuery,
  ): Promise<EstagiarioFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
