import type { HorarioAulaEntity } from "@/modules/horarios/horario-aula/infrastructure.database/typeorm/horario-aula.typeorm.entity";

export const IHorarioAulaRepository = Symbol("IHorarioAulaRepository");

export interface IHorarioAulaRepository {
  findAll(where?: Record<string, unknown>): Promise<HorarioAulaEntity[]>;
  findById(id: string): Promise<HorarioAulaEntity | null>;
  save(entity: HorarioAulaEntity): Promise<HorarioAulaEntity>;
  remove(entity: HorarioAulaEntity): Promise<void>;
}
