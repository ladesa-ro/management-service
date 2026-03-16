import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
import type { IGerarHorarioFindOneQuery, IGerarHorarioFindOneQueryHandler } from "../../domain/queries/gerar-horario-find-one.query.handler.interface";
import { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioFindOneQueryHandlerImpl implements IGerarHorarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorarioEntity | null> {
    const repo = this.dataSource.getRepository(GerarHorarioEntity);
    return repo.findOneBy({ id: query.id });
  }
}
