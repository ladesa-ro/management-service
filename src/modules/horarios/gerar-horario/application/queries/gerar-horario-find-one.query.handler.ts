import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  IGerarHorarioFindOneQuery,
  IGerarHorarioFindOneQueryHandler,
} from "../../domain/queries/gerar-horario-find-one.query.handler.interface";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioFindOneQueryHandlerImpl implements IGerarHorarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorarioEntity | null> {
    return this.gerarHorarioRepository.findOneBy({ id: query.id });
  }
}
