import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IPerfilFindOneQuery,
  IPerfilFindOneQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IPerfilRepository } from "../../domain/repositories";
import type { PerfilFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class PerfilFindOneQueryHandlerImpl implements IPerfilFindOneQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IPerfilFindOneQuery): Promise<PerfilFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
