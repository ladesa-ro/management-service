import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import type { UsuarioFindOneQuery, UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@Impl()
export class UsuarioFindOneQueryHandlerImpl implements IUsuarioFindOneQueryHandler {
  constructor(
    @Dep(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: UsuarioFindOneQuery,
  ): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
