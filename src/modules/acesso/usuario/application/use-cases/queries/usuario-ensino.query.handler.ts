import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IUsuarioEnsinoQuery,
  IUsuarioEnsinoQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { IUsuarioRepository } from "../../../domain/repositories";
import type { UsuarioEnsinoOutput } from "../../dtos";

@Injectable()
export class UsuarioEnsinoQueryHandlerImpl implements IUsuarioEnsinoQueryHandler {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioEnsinoQuery): Promise<UsuarioEnsinoOutput> {
    const usuario = await this.repository.findById(accessContext, dto, selection);

    ensureExists(usuario, "Usuario", dto.id);

    const { disciplinas } = await this.repository.findUsuarioEnsino(usuario.id);

    return {
      usuario: usuario,
      disciplinas: disciplinas,
    };
  }
}
