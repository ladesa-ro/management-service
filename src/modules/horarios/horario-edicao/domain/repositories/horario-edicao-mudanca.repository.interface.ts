import type { HorarioEdicaoMudancaEntity } from "@/modules/horarios/horario-edicao/infrastructure.database/typeorm/horario-edicao-mudanca.typeorm.entity";

export const IHorarioEdicaoMudancaRepository = Symbol("IHorarioEdicaoMudancaRepository");

export interface IHorarioEdicaoMudancaRepository {
  save(entity: HorarioEdicaoMudancaEntity): Promise<HorarioEdicaoMudancaEntity>;
  findBySessaoId(sessaoId: string): Promise<HorarioEdicaoMudancaEntity[]>;
}
