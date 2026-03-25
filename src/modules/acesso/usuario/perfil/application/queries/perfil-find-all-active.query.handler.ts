import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IPerfilFindAllActiveQuery,
  IPerfilFindAllActiveQueryHandler,
} from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import type { PerfilFindOneQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilFindAllActiveQueryHandlerImpl implements IPerfilFindAllActiveQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { usuarioId }: IPerfilFindAllActiveQuery,
  ): Promise<PerfilFindOneQueryResult[]> {
    return this.repository.findAllActiveByUsuarioId(accessContext, usuarioId);
  }
}
