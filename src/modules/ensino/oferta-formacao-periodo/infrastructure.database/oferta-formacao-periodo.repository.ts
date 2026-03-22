import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IOfertaFormacaoPeriodoRepository } from "../domain/repositories";
import { OfertaFormacaoPeriodoEntity } from "./typeorm/oferta-formacao-periodo.typeorm.entity";

@DeclareImplementation()
export class OfertaFormacaoPeriodoTypeOrmRepositoryAdapter
  implements IOfertaFormacaoPeriodoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(OfertaFormacaoPeriodoEntity);
  }

  async findByOfertaFormacaoId(ofertaFormacaoId: string): Promise<OfertaFormacaoPeriodoEntity[]> {
    return this.repository.find({
      where: { ofertaFormacao: { id: ofertaFormacaoId } } as any,
      order: { numeroPeriodo: "ASC" },
    });
  }

  async deleteByOfertaFormacaoId(ofertaFormacaoId: string): Promise<void> {
    await this.repository.delete({ ofertaFormacao: { id: ofertaFormacaoId } } as any);
  }

  async save(entity: OfertaFormacaoPeriodoEntity): Promise<OfertaFormacaoPeriodoEntity> {
    return this.repository.save(entity);
  }
}
