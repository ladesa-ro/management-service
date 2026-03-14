import { Inject, Injectable } from "@nestjs/common";
import {
  type IUsuarioListQuery,
  IUsuarioListQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import { IUsuarioRepository } from "../../domain/repositories";
import type { UsuarioListOutputDto } from "../dtos";

@Injectable()
export class UsuarioListQueryHandlerImpl implements IUsuarioListQueryHandler {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioListQuery): Promise<UsuarioListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
