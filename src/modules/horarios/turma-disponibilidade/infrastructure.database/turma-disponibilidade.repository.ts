import type { Repository } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { getNowISO } from "@/utils/date";
import type { ITurmaDisponibilidadeRepository } from "../domain/repositories";
import { TurmaDisponibilidadeConfiguracao } from "../domain/turma-disponibilidade";
import { TurmaDisponibilidadeConfiguracaoEntity } from "./typeorm/turma-disponibilidade-configuracao.typeorm.entity";
import { TurmaDisponibilidadeConfiguracaoItemEntity } from "./typeorm/turma-disponibilidade-configuracao-item.typeorm.entity";

@DeclareImplementation()
export class TurmaDisponibilidadeTypeOrmRepositoryAdapter
  implements ITurmaDisponibilidadeRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findByWeek(
    turmaId: string,
    domingoSemana: string,
  ): Promise<TurmaDisponibilidadeConfiguracao | null> {
    const configRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoEntity,
    );

    const domingo = new Date(domingoSemana);
    const sabado = new Date(domingo);
    sabado.setUTCDate(sabado.getUTCDate() + 6);
    const sabadoStr = sabado.toISOString().split("T")[0];

    const config = await configRepo
      .createQueryBuilder("config")
      .where("config.id_turma_fk = :turmaId", { turmaId })
      .andWhere("config.ativo = true")
      .andWhere("config.data_inicio <= :sabado", { sabado: sabadoStr })
      .andWhere("(config.data_fim IS NULL OR config.data_fim >= :domingo)", {
        domingo: domingoSemana,
      })
      .orderBy("config.data_inicio", "DESC")
      .getOne();

    if (!config) {
      return null;
    }

    return this.loadConfigWithItems(config, turmaId);
  }

  async findAllActiveByTurmaId(turmaId: string): Promise<TurmaDisponibilidadeConfiguracao[]> {
    const configRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoEntity,
    );

    const configs = await configRepo
      .createQueryBuilder("config")
      .where("config.id_turma_fk = :turmaId", { turmaId })
      .andWhere("config.ativo = true")
      .orderBy("config.data_inicio", "ASC")
      .getMany();

    const results: TurmaDisponibilidadeConfiguracao[] = [];

    for (const config of configs) {
      results.push(await this.loadConfigWithItems(config, turmaId));
    }

    return results;
  }

  async save(config: TurmaDisponibilidadeConfiguracao): Promise<void> {
    const configRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoEntity,
    );
    const itemRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoItemEntity,
    );

    const configEntity = configRepo.create({
      id: config.id,
      dataInicio: config.dataInicio,
      dataFim: config.dataFim,
      ativo: config.ativo,
      identificadorExternoGradeHoraria: config.identificadorExternoGradeHoraria,
      dateCreated: config.dateCreated,
      dateUpdated: config.dateUpdated,
      dateDeleted: config.dateDeleted,
    });
    Object.assign(configEntity, { turma: { id: config.turma.id } });
    await configRepo.save(configEntity);

    // Deletar items existentes (em caso de upsert)
    await itemRepo
      .createQueryBuilder()
      .delete()
      .where("id_turma_disponibilidade_configuracao_fk = :configId", { configId: config.id })
      .execute();

    const itemEntities = config.horarios.map((item) => {
      const entity = new TurmaDisponibilidadeConfiguracaoItemEntity();
      entity.id = generateUuidV7();
      entity.diaSemana = item.diaSemana;
      entity.inicio = item.inicio;
      entity.fim = item.fim;
      Object.assign(entity, { turmaDisponibilidadeConfiguracao: { id: config.id } });
      return entity;
    });

    if (itemEntities.length > 0) {
      await itemRepo.save(itemEntities);
    }
  }

  async encerrarVigente(turmaId: string, dataFim: string): Promise<void> {
    const configRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoEntity,
    );

    await configRepo
      .createQueryBuilder()
      .update(TurmaDisponibilidadeConfiguracaoEntity)
      .set({
        ativo: false,
        dataFim,
        dateUpdated: getNowISO(),
      })
      .where("id_turma_fk = :turmaId", { turmaId })
      .andWhere("ativo = true")
      .execute();
  }

  async findActiveOverlapping(
    turmaId: string,
    rangeInicio: string,
    rangeFim: string | null,
  ): Promise<TurmaDisponibilidadeConfiguracao[]> {
    const configRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoEntity,
    );

    const qb = configRepo
      .createQueryBuilder("config")
      .where("config.id_turma_fk = :turmaId", { turmaId })
      .andWhere("config.ativo = true")
      .andWhere("(config.data_fim IS NULL OR config.data_fim >= :rangeInicio)", { rangeInicio });

    if (rangeFim !== null) {
      qb.andWhere("config.data_inicio <= :rangeFim", { rangeFim });
    }

    const configs = await qb.orderBy("config.data_inicio", "ASC").getMany();

    const results: TurmaDisponibilidadeConfiguracao[] = [];

    for (const config of configs) {
      results.push(await this.loadConfigWithItems(config, turmaId));
    }

    return results;
  }

  async deactivateById(configId: string): Promise<void> {
    const configRepo = this.appTypeormConnection.getRepository(
      TurmaDisponibilidadeConfiguracaoEntity,
    );

    await configRepo
      .createQueryBuilder()
      .update(TurmaDisponibilidadeConfiguracaoEntity)
      .set({
        ativo: false,
        dateUpdated: getNowISO(),
      })
      .where("id = :configId", { configId })
      .execute();
  }

  private async loadConfigWithItems(
    config: TurmaDisponibilidadeConfiguracaoEntity,
    turmaId: string,
  ): Promise<TurmaDisponibilidadeConfiguracao> {
    const itemRepo: Repository<TurmaDisponibilidadeConfiguracaoItemEntity> =
      this.appTypeormConnection.getRepository(TurmaDisponibilidadeConfiguracaoItemEntity);

    const items = await itemRepo.find({
      where: { turmaDisponibilidadeConfiguracao: { id: config.id } },
      order: { diaSemana: "ASC", inicio: "ASC" },
    });

    const horarios = items.map((item) => ({
      diaSemana: item.diaSemana,
      inicio: item.inicio,
      fim: item.fim,
    }));

    // TypeORM retorna Date para colunas timestamptz — converter para ISO string
    const toISO = (v: string | Date | null): string | null =>
      v instanceof Date ? v.toISOString() : v;

    return TurmaDisponibilidadeConfiguracao.load({
      id: config.id,
      turma: { id: turmaId },
      dataInicio: config.dataInicio,
      dataFim: config.dataFim,
      ativo: config.ativo,
      horarios,
      identificadorExternoGradeHoraria: config.identificadorExternoGradeHoraria ?? null,
      dateCreated: toISO(config.dateCreated) as string,
      dateUpdated: toISO(config.dateUpdated) as string,
      dateDeleted: toISO(config.dateDeleted),
    });
  }
}
