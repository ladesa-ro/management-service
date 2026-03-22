import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IUsuarioFindByMatriculaQuery,
  IUsuarioFindByMatriculaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioFindByMatriculaQueryHandlerImpl implements IUsuarioFindByMatriculaQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    { matricula, selection }: IUsuarioFindByMatriculaQuery,
  ): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.findByMatricula(matricula, selection);
  }
}
