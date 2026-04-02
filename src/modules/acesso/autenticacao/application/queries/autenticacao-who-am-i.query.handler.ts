import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAutenticacaoWhoAmIQueryHandler } from "@/modules/acesso/autenticacao/domain/queries/autenticacao-who-am-i.query.handler.interface";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import { IPerfilFindAllActiveQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import { AuthWhoAmIQueryResult } from "../../domain/queries";

@DeclareImplementation()
export class AutenticacaoWhoAmIQueryHandlerImpl implements IAutenticacaoWhoAmIQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioFindOneQueryHandler)
    private readonly usuarioFindOneHandler: IUsuarioFindOneQueryHandler,
    @DeclareDependency(IPerfilFindAllActiveQueryHandler)
    private readonly perfilFindAllActiveHandler: IPerfilFindAllActiveQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    _query: void,
  ): Promise<AuthWhoAmIQueryResult> {
    const usuario = accessContext?.requestActor
      ? await this.usuarioFindOneHandler.execute(accessContext, {
          id: accessContext.requestActor.id,
        })
      : null;

    if (usuario) {
      const perfisAtivos = await this.perfilFindAllActiveHandler.execute(null, {
        usuarioId: usuario.id,
      });

      const result = new AuthWhoAmIQueryResult();
      result.usuario = usuario;
      result.perfisAtivos = perfisAtivos;
      return result;
    }

    const result = new AuthWhoAmIQueryResult();
    result.usuario = null;
    result.perfisAtivos = [];
    return result;
  }
}
