import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IUsuarioEnsinoQuery,
  IUsuarioEnsinoQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";
import type { UsuarioEnsinoOutput } from "../../dtos";

@Injectable()
export class UsuarioEnsinoQueryHandlerImpl implements IUsuarioEnsinoQueryHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioEnsinoQuery): Promise<UsuarioEnsinoOutput> {
    const usuario = await this.repository.findById(accessContext, dto, selection);

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", dto.id);
    }

    const { disciplinas } = await this.repository.findUsuarioEnsino(usuario.id);

    return {
      usuario: usuario,
      disciplinas: disciplinas,
    };
  }
}
