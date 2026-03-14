import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IPerfilFindAllActiveQuery,
  IPerfilFindAllActiveQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import type { PerfilFindOneQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";
@DeclareImplementation()
export class PerfilFindAllActiveQueryHandlerImpl implements IPerfilFindAllActiveQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({
    accessContext,
    usuarioId,
  }: IPerfilFindAllActiveQuery): Promise<PerfilFindOneQueryResult[]> {
    return this.repository.findAllActiveByUsuarioId(accessContext, usuarioId);
  }
}
