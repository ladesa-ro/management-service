import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import type { UsuarioFindOneQuery, UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioFindOneQueryHandlerImpl implements IUsuarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: UsuarioFindOneQuery,
  ): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
