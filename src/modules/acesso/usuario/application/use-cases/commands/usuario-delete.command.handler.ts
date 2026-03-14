import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IUsuarioDeleteCommand,
  IUsuarioDeleteCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import { IUsuarioRepository } from "../../../domain/repositories";

@Injectable()
export class UsuarioDeleteCommandHandlerImpl implements IUsuarioDeleteCommandHandler {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({ accessContext, dto }: IUsuarioDeleteCommand): Promise<boolean> {
    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id);

    const usuario = await this.repository.findById(accessContext, dto);

    ensureExists(usuario, Usuario.entityName, dto.id);

    await this.repository.softDeleteById(usuario.id);

    return true;
  }
}
