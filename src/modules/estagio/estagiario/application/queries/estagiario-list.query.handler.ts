import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagiarioListQueryHandler } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EstagiarioListQuery, EstagiarioListQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioListQueryHandlerImpl implements IEstagiarioListQueryHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstagiarioListQuery | null,
  ): Promise<EstagiarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
