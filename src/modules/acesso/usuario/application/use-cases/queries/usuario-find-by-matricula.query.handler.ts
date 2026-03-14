import { Inject, Injectable } from "@nestjs/common";
import {
  type IUsuarioFindByMatriculaQuery,
  IUsuarioFindByMatriculaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import { IUsuarioRepository } from "../../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class UsuarioFindByMatriculaQueryHandlerImpl implements IUsuarioFindByMatriculaQueryHandler {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    matricula,
    selection,
  }: IUsuarioFindByMatriculaQuery): Promise<UsuarioFindOneOutputDto | null> {
    return this.repository.findByMatricula(matricula, selection);
  }
}
