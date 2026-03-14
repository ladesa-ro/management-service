import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IPerfilListQuery,
  IPerfilListQueryHandler,
} from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import { IPerfilRepository } from "../../domain/repositories";
import type { PerfilListOutputDto } from "../dtos";

@DeclareImplementation()
export class PerfilListQueryHandlerImpl implements IPerfilListQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute({ accessContext, dto }: IPerfilListQuery): Promise<PerfilListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
