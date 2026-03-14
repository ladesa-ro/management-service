import { Inject, Injectable } from "@nestjs/common";
import {
  type IUsuarioFindByMatriculaQuery,
  IUsuarioFindByMatriculaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class UsuarioFindByMatriculaQueryHandlerImpl implements IUsuarioFindByMatriculaQueryHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
  ) {}

  async execute({
    matricula,
    selection,
  }: IUsuarioFindByMatriculaQuery): Promise<UsuarioFindOneOutputDto | null> {
    return this.repository.findByMatricula(matricula, selection);
  }
}
