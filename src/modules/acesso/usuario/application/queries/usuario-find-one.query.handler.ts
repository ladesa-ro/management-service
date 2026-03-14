import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IUsuarioFindOneQuery,
  IUsuarioFindOneQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";
@DeclareImplementation()
export class UsuarioFindOneQueryHandlerImpl implements IUsuarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IUsuarioFindOneQuery): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
