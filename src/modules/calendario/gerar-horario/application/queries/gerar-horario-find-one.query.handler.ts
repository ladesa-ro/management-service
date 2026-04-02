import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { GerarHorario } from "../../domain/gerar-horario";
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
    _accessContext: IAccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorario | null> {
    return this.gerarHorarioRepository.loadById(query.id);
  }
}
