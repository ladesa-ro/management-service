import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IUsuarioDeleteCommand,
  IUsuarioDeleteCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";

@Injectable()
export class UsuarioDeleteCommandHandlerImpl implements IUsuarioDeleteCommandHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
  ) {}

  async execute({ accessContext, dto }: IUsuarioDeleteCommand): Promise<boolean> {
    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id);

    const usuario = await this.repository.findById(accessContext, dto);

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", dto.id);
    }

    await this.repository.softDeleteById(usuario.id);

    return true;
  }
}
