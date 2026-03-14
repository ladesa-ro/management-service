import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IUsuarioListQuery,
  IUsuarioListQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import type { UsuarioListQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioListQueryHandlerImpl implements IUsuarioListQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioListQuery): Promise<UsuarioListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
