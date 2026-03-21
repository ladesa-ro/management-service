import type { HorarioEdicaoMudancaEntity } from "@/modules/horarios/horario-edicao/infrastructure.database/typeorm/horario-edicao-mudanca.typeorm.entity";

export const IHorarioEdicaoApplicator = Symbol("IHorarioEdicaoApplicator");

export interface IHorarioEdicaoApplicator {
  applyMudancas(mudancas: HorarioEdicaoMudancaEntity[]): Promise<void>;
}
