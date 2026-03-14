import { Inject, Injectable } from "@nestjs/common";
import {
  type IPerfilFindOneQuery,
  IPerfilFindOneQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IPerfilRepository } from "../../domain/repositories";
import type { PerfilFindOneOutputDto } from "../dtos";

@Injectable()
export class PerfilFindOneQueryHandlerImpl implements IPerfilFindOneQueryHandler {
  constructor(
    @Inject(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IPerfilFindOneQuery): Promise<PerfilFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
