import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IPerfilListQuery,
  IPerfilListQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import type { PerfilListQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";
@DeclareImplementation()
export class PerfilListQueryHandlerImpl implements IPerfilListQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({ accessContext, dto }: IPerfilListQuery): Promise<PerfilListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
