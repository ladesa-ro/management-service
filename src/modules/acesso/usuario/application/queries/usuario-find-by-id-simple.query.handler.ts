import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioFindByIdSimpleQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { UsuarioFindOneQuery, UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioFindByIdSimpleQueryHandlerImpl implements IUsuarioFindByIdSimpleQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneQuery,
  ): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.findByIdSimple(accessContext, dto.id, dto.selection);
  }
}
