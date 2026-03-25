import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioEnsinoQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import type { UsuarioEnsinoQueryResult, UsuarioFindOneQuery } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioEnsinoQueryHandlerImpl implements IUsuarioEnsinoQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: UsuarioFindOneQuery,
  ): Promise<UsuarioEnsinoQueryResult> {
    const usuario = await this.repository.getFindOneQueryResult(accessContext, dto);

    ensureExists(usuario, Usuario.entityName, dto.id);

    const { disciplinas } = await this.repository.findUsuarioEnsino(usuario.id);

    return {
      usuario: usuario,
      disciplinas: disciplinas,
    };
  }
}
