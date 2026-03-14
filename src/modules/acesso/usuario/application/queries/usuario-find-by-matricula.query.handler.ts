import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IUsuarioFindByMatriculaQuery,
  IUsuarioFindByMatriculaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import { IUsuarioRepository } from "../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class UsuarioFindByMatriculaQueryHandlerImpl implements IUsuarioFindByMatriculaQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    matricula,
    selection,
  }: IUsuarioFindByMatriculaQuery): Promise<UsuarioFindOneOutputDto | null> {
    return this.repository.findByMatricula(matricula, selection);
  }
}
