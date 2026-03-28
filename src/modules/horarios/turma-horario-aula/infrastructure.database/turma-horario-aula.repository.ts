import type { FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { ITurmaHorarioAulaRepository } from "../domain/repositories";
import type { ITurmaHorarioAulaItem } from "../domain/turma-horario-aula.types";
import { TurmaHorarioAulaConfiguracaoEntity } from "./typeorm/turma-horario-aula-configuracao.typeorm.entity";
import { TurmaHorarioAulaConfiguracaoItemEntity } from "./typeorm/turma-horario-aula-configuracao-item.typeorm.entity";

@DeclareImplementation()
export class TurmaHorarioAulaTypeOrmRepositoryAdapter implements ITurmaHorarioAulaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findItemsByTurmaId(turmaId: string): Promise<ITurmaHorarioAulaItem[]> {
    const configRepo = this.appTypeormConnection.getRepository(TurmaHorarioAulaConfiguracaoEntity);
    const itemRepo = this.appTypeormConnection.getRepository(
      TurmaHorarioAulaConfiguracaoItemEntity,
    );

    const config = await configRepo.findOne({
      where: { turma: { id: turmaId } },
    });

    if (!config) {
      return [];
    }

    const items = await itemRepo.find({
      where: { turmaHorarioAulaConfiguracao: { id: config.id } },
      order: { inicio: "ASC" },
    });

    return items.map((item) => ({ inicio: item.inicio, fim: item.fim }));
  }

  async replaceItems(turmaId: string, items: ITurmaHorarioAulaItem[]): Promise<void> {
    const configRepo = this.appTypeormConnection.getRepository(TurmaHorarioAulaConfiguracaoEntity);
    const itemRepo = this.appTypeormConnection.getRepository(
      TurmaHorarioAulaConfiguracaoItemEntity,
    );

    // Buscar ou criar a configuracao da turma
    let config = await configRepo.findOne({
      where: { turma: { id: turmaId } },
    });

    if (!config) {
      config = configRepo.create({ id: generateUuidV7() });
      Object.assign(config, { turma: { id: turmaId } });
      await configRepo.save(config);
    }

    // Deletar items existentes
    await itemRepo.delete({
      turmaHorarioAulaConfiguracao: { id: config.id },
    } as FindOptionsWhere<TurmaHorarioAulaConfiguracaoItemEntity>);

    // Criar novos items
    for (const item of items) {
      const entity = new TurmaHorarioAulaConfiguracaoItemEntity();
      entity.id = generateUuidV7();
      entity.inicio = item.inicio;
      entity.fim = item.fim;
      Object.assign(entity, { turmaHorarioAulaConfiguracao: { id: config.id } });
      await itemRepo.save(entity);
    }
  }
}
