import { Inject, Injectable } from "@nestjs/common";
import {
  type IPerfilFindAllActiveQuery,
  IPerfilFindAllActiveQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import { IPerfilRepository } from "../../domain/repositories";
import type { PerfilFindOneOutputDto } from "../dtos";

@Injectable()
export class PerfilFindAllActiveQueryHandlerImpl implements IPerfilFindAllActiveQueryHandler {
  constructor(
    @Inject(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({
    accessContext,
    usuarioId,
  }: IPerfilFindAllActiveQuery): Promise<PerfilFindOneOutputDto[]> {
    return this.repository.findAllActiveByUsuarioId(accessContext, usuarioId);
  }
}
