import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IUsuarioListQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import type { UsuarioListQuery, UsuarioListQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@Impl()
export class UsuarioListQueryHandlerImpl implements IUsuarioListQueryHandler {
  constructor(
    @Dep(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: UsuarioListQuery | null,
  ): Promise<UsuarioListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
