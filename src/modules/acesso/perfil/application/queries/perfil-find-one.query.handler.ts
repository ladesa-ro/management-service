import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IPerfilFindOneQuery,
  IPerfilFindOneQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import type { PerfilFindOneQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilFindOneQueryHandlerImpl implements IPerfilFindOneQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IPerfilFindOneQuery): Promise<PerfilFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}
