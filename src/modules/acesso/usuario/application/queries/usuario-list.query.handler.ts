import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioListQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { UsuarioListQuery, UsuarioListQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioListQueryHandlerImpl implements IUsuarioListQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: UsuarioListQuery | null,
  ): Promise<UsuarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
