import { Inject, Injectable } from "@nestjs/common";
import {
  type IUsuarioListQuery,
  IUsuarioListQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";
import type { UsuarioListOutputDto } from "../../dtos";

@Injectable()
export class UsuarioListQueryHandlerImpl implements IUsuarioListQueryHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioListQuery): Promise<UsuarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
