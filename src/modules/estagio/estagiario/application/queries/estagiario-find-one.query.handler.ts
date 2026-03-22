import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagiarioFindOneQueryHandler } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EstagiarioFindOneQuery, EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioFindOneQueryHandlerImpl implements IEstagiarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneQuery,
  ): Promise<EstagiarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
