import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IOfertaFormacaoPeriodoEtapaRepository } from "../domain/repositories";
import { OfertaFormacaoPeriodoEtapaEntity } from "./typeorm/oferta-formacao-periodo-etapa.typeorm.entity";

@DeclareImplementation()
export class OfertaFormacaoPeriodoEtapaTypeOrmRepositoryAdapter
  implements IOfertaFormacaoPeriodoEtapaRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(OfertaFormacaoPeriodoEtapaEntity);
  }

  async findByPeriodoId(periodoId: string): Promise<OfertaFormacaoPeriodoEtapaEntity[]> {
    return this.repository.find({
      where: { idOfertaFormacaoPeriodoFk: periodoId },
    });
  }

  async deleteByPeriodoId(periodoId: string): Promise<void> {
    await this.repository.delete({ idOfertaFormacaoPeriodoFk: periodoId });
  }

  async save(entity: OfertaFormacaoPeriodoEtapaEntity): Promise<OfertaFormacaoPeriodoEtapaEntity> {
    return this.repository.save(entity);
  }
}
