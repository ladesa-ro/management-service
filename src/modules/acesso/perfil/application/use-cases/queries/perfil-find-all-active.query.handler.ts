import { Inject, Injectable } from "@nestjs/common";
import {
  type IPerfilFindAllActiveQuery,
  IPerfilFindAllActiveQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import { type IPerfilRepositoryPort, PERFIL_REPOSITORY_PORT } from "../../../domain/repositories";
import type { PerfilFindOneOutputDto } from "../../dtos";

@Injectable()
export class PerfilFindAllActiveQueryHandlerImpl implements IPerfilFindAllActiveQueryHandler {
  constructor(
    @Inject(PERFIL_REPOSITORY_PORT)
    private readonly repository: IPerfilRepositoryPort,
  ) {}

  async execute({
    accessContext,
    usuarioId,
  }: IPerfilFindAllActiveQuery): Promise<PerfilFindOneOutputDto[]> {
    return this.repository.findAllActiveByUsuarioId(accessContext, usuarioId);
  }
}
