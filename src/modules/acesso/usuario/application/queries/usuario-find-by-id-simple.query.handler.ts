import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IUsuarioFindByIdSimpleQuery,
  IUsuarioFindByIdSimpleQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import { IUsuarioRepository } from "../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../dtos";

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
  }: IUsuarioFindByIdSimpleQuery): Promise<UsuarioFindOneOutputDto | null> {
    return this.repository.findByIdSimple(accessContext, id, selection);
  }
}
