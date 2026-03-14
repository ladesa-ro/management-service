import { Inject, Injectable } from "@nestjs/common";
import {
  type IPerfilListQuery,
  IPerfilListQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import { type IPerfilRepositoryPort, PERFIL_REPOSITORY_PORT } from "../../../domain/repositories";
import type { PerfilListOutputDto } from "../../dtos";

@Injectable()
export class PerfilListQueryHandlerImpl implements IPerfilListQueryHandler {
  constructor(
    @Inject(PERFIL_REPOSITORY_PORT)
    private readonly repository: IPerfilRepositoryPort,
  ) {}

  async execute({ accessContext, dto }: IPerfilListQuery): Promise<PerfilListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
