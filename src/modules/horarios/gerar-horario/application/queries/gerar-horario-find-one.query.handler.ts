import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  IGerarHorarioFindOneQuery,
  IGerarHorarioFindOneQueryHandler,
} from "../../domain/queries/gerar-horario-find-one.query.handler.interface";
import { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioFindOneQueryHandlerImpl implements IGerarHorarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorarioEntity | null> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);
    return repo.findOneBy({ id: query.id });
  }
}
