import type { HorarioAulaConfiguracaoEntity } from "@/modules/horarios/horario-aula-configuracao/infrastructure.database/typeorm/horario-aula-configuracao.typeorm.entity";

export const IHorarioAulaConfiguracaoRepository = Symbol("IHorarioAulaConfiguracaoRepository");

export interface IHorarioAulaConfiguracaoRepository {
  findAll(where?: Record<string, unknown>): Promise<HorarioAulaConfiguracaoEntity[]>;
  findById(id: string): Promise<HorarioAulaConfiguracaoEntity | null>;
  save(entity: HorarioAulaConfiguracaoEntity): Promise<HorarioAulaConfiguracaoEntity>;
  remove(entity: HorarioAulaConfiguracaoEntity): Promise<void>;
}
