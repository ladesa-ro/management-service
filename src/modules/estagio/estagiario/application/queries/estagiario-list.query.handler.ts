import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagiarioListQueryHandler } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import type { EstagiarioListQuery, EstagiarioListQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@Impl()
export class EstagiarioListQueryHandlerImpl implements IEstagiarioListQueryHandler {
  constructor(
    @Dep(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagiarioListQuery | null,
  ): Promise<EstagiarioListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
