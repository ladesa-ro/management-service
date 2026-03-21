import type { FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IGerarHorarioRepository } from "../domain/repositories/gerar-horario.repository.interface";
import { GerarHorarioEntity } from "./typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioTypeOrmRepositoryAdapter implements IGerarHorarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findOneBy(where: FindOptionsWhere<GerarHorarioEntity>): Promise<GerarHorarioEntity | null> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);
    return repo.findOneBy(where);
  }

  async save(entity: GerarHorarioEntity): Promise<GerarHorarioEntity> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);
    return repo.save(entity);
  }
}
