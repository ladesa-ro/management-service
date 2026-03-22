import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioEnsinoQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import type { AccessContext } from "@/server/access-context";
import type { UsuarioEnsinoQueryResult, UsuarioFindOneQuery } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioEnsinoQueryHandlerImpl implements IUsuarioEnsinoQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneQuery,
  ): Promise<UsuarioEnsinoQueryResult> {
    const usuario = await this.repository.findById(accessContext, dto, dto?.selection);

    ensureExists(usuario, Usuario.entityName, dto.id);

    const { disciplinas } = await this.repository.findUsuarioEnsino(usuario.id);

    return {
      usuario: usuario,
      disciplinas: disciplinas,
    };
  }
}
