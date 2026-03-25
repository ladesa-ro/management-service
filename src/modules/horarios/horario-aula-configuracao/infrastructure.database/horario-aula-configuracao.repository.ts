import type { FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IHorarioAulaConfiguracao } from "../domain/horario-aula-configuracao.types";
import type { IHorarioAulaConfiguracaoRepository } from "../domain/repositories/horario-aula-configuracao.repository.interface";
import { HorarioAulaEntity } from "./typeorm/horario-aula.typeorm.entity";
import { HorarioAulaConfiguracaoEntity } from "./typeorm/horario-aula-configuracao.typeorm.entity";

@DeclareImplementation()
export class HorarioAulaConfiguracaoTypeOrmRepositoryAdapter
  implements IHorarioAulaConfiguracaoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findAll(where?: Record<string, unknown>): Promise<IHorarioAulaConfiguracao[]> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    const entities = await repo.find({
      where,
      order: { dataInicio: "ASC" },
    });

    return Promise.all(entities.map((e) => this.withHorarios(e)));
  }

  async findById(id: string): Promise<IHorarioAulaConfiguracao | null> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    const entity = await repo.findOneBy({ id });
    if (!entity) return null;

    return this.withHorarios(entity);
  }

  async save(data: Partial<IHorarioAulaConfiguracao>): Promise<IHorarioAulaConfiguracao> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);

    const { horarios, ...entityData } = data;

    const saved = await repo.save(entityData as HorarioAulaConfiguracaoEntity);

    if (horarios !== undefined) {
      await this.replaceHorarios(saved.id, horarios);
    }

    return this.withHorarios(saved);
  }

  async remove(entity: IHorarioAulaConfiguracao): Promise<void> {
    const horarioRepo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    await horarioRepo.delete({
      horarioAulaConfiguracao: { id: entity.id },
    } as FindOptionsWhere<HorarioAulaEntity>);

    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    await repo.remove({ id: entity.id } as HorarioAulaConfiguracaoEntity);
  }

  // ============================================================================
  // Horários (value objects do aggregate)
  // ============================================================================

  private async withHorarios(
    entity: HorarioAulaConfiguracaoEntity,
  ): Promise<IHorarioAulaConfiguracao> {
    const horarioRepo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    const horarios = await horarioRepo.find({
      where: { horarioAulaConfiguracao: { id: entity.id } },
      order: { inicio: "ASC" },
    });

    return {
      ...entity,
      horarios: horarios.map((h) => ({
        inicio: h.inicio,
        fim: h.fim,
      })),
    };
  }

  private async replaceHorarios(
    configuracaoId: string,
    horarios: Array<{ inicio: string; fim: string }>,
  ): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaEntity);

    await repo.delete({
      horarioAulaConfiguracao: { id: configuracaoId },
    } as FindOptionsWhere<HorarioAulaEntity>);

    for (const h of horarios) {
      const entity = new HorarioAulaEntity();
      entity.id = generateUuidV7();
      entity.inicio = h.inicio;
      entity.fim = h.fim;
      Object.assign(entity, { horarioAulaConfiguracao: { id: configuracaoId } });
      await repo.save(entity);
    }
  }
}
