import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAutenticacaoWhoAmIQuery,
  IAutenticacaoWhoAmIQueryHandler,
} from "@/modules/acesso/autenticacao/domain/queries/autenticacao-who-am-i.query.handler.interface";
import { IPerfilFindAllActiveQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import type { AuthWhoAmIQueryResult } from "../../domain/queries";
@DeclareImplementation()
export class AutenticacaoWhoAmIQueryHandlerImpl implements IAutenticacaoWhoAmIQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioFindOneQueryHandler)
    private readonly usuarioFindOneHandler: IUsuarioFindOneQueryHandler,
    @DeclareDependency(IPerfilFindAllActiveQueryHandler)
    private readonly perfilFindAllActiveHandler: IPerfilFindAllActiveQueryHandler,
  ) {}

  async execute({ accessContext }: IAutenticacaoWhoAmIQuery): Promise<AuthWhoAmIQueryResult> {
    const usuario = accessContext.requestActor
      ? await this.usuarioFindOneHandler.execute({
          accessContext,
          dto: { id: accessContext.requestActor.id },
        })
      : null;

    if (usuario) {
      const perfisAtivos = await this.perfilFindAllActiveHandler.execute({
        accessContext: null,
        usuarioId: usuario.id,
      });

      return {
        usuario,
        perfisAtivos: perfisAtivos,
      } as unknown as AuthWhoAmIQueryResult;
    }

    return {
      usuario: null,
      perfisAtivos: [],
    };
  }
}
