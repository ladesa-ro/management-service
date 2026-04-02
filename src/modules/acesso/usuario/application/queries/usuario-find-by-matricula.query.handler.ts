import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  type IUsuarioFindByMatriculaQuery,
  IUsuarioFindByMatriculaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@Impl()
export class UsuarioFindByMatriculaQueryHandlerImpl implements IUsuarioFindByMatriculaQueryHandler {
  constructor(
    @Dep(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { matricula }: IUsuarioFindByMatriculaQuery,
  ): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.findByMatricula(matricula);
  }
}
