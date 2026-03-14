import { Inject, Injectable } from "@nestjs/common";
import {
  type IUsuarioFindOneQuery,
  IUsuarioFindOneQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class UsuarioFindOneQueryHandlerImpl implements IUsuarioFindOneQueryHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioFindOneQuery): Promise<UsuarioFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
