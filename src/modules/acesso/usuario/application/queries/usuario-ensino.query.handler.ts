import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type IUsuarioEnsinoQuery,
  IUsuarioEnsinoQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import type { UsuarioEnsinoQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";
@DeclareImplementation()
export class UsuarioEnsinoQueryHandlerImpl implements IUsuarioEnsinoQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioEnsinoQuery): Promise<UsuarioEnsinoQueryResult> {
    const usuario = await this.repository.findById(accessContext, dto, selection);

    ensureExists(usuario, Usuario.entityName, dto.id);

    const { disciplinas } = await this.repository.findUsuarioEnsino(usuario.id);

    return {
      usuario: usuario,
      disciplinas: disciplinas,
    };
  }
}
