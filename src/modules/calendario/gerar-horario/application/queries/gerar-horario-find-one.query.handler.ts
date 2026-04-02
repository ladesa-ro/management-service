import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { GerarHorario } from "../../domain/gerar-horario";
import type {
  IGerarHorarioFindOneQuery,
  IGerarHorarioFindOneQueryHandler,
} from "../../domain/queries/gerar-horario-find-one.query.handler.interface";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@Impl()
export class GerarHorarioFindOneQueryHandlerImpl implements IGerarHorarioFindOneQueryHandler {
  constructor(
    @Dep(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorario | null> {
    return this.gerarHorarioRepository.loadById(query.id);
  }
}
