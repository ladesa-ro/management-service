import { Inject, Injectable } from "@nestjs/common";
import {
  type IUsuarioFindByIdSimpleQuery,
  IUsuarioFindByIdSimpleQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class UsuarioFindByIdSimpleQueryHandlerImpl implements IUsuarioFindByIdSimpleQueryHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    id,
    selection,
  }: IUsuarioFindByIdSimpleQuery): Promise<UsuarioFindOneOutputDto | null> {
    return this.repository.findByIdSimple(accessContext, id, selection);
  }
}
