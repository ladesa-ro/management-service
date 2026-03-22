import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/server/access-context";
import type { IGerarHorario } from "../../domain/gerar-horario.types";
import type {
  IGerarHorarioFindOneQuery,
  IGerarHorarioFindOneQueryHandler,
} from "../../domain/queries/gerar-horario-find-one.query.handler.interface";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@DeclareImplementation()
export class GerarHorarioFindOneQueryHandlerImpl implements IGerarHorarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<IGerarHorario | null> {
    return this.gerarHorarioRepository.findOneBy({ id: query.id });
  }
}
