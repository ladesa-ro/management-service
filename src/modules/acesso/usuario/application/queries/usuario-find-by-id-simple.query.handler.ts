import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IUsuarioFindByIdSimpleQuery,
  IUsuarioFindByIdSimpleQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioFindByIdSimpleQueryHandlerImpl implements IUsuarioFindByIdSimpleQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async execute({
    accessContext,
    id,
    selection,
  }: IUsuarioFindByIdSimpleQuery): Promise<UsuarioFindOneQueryResult | null> {
    return this.repository.findByIdSimple(accessContext, id, selection);
  }
}
