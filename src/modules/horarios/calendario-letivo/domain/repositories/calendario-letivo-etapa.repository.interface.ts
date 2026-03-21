import type { CalendarioLetivoEtapaEntity } from "@/modules/horarios/calendario-letivo/infrastructure.database/typeorm/calendario-letivo-etapa.typeorm.entity";

export const ICalendarioLetivoEtapaRepository = Symbol("ICalendarioLetivoEtapaRepository");

export interface ICalendarioLetivoEtapaRepository {
  findByCalendarioLetivoId(calendarioLetivoId: string): Promise<CalendarioLetivoEtapaEntity[]>;
  softDeleteByCalendarioLetivoId(calendarioLetivoId: string): Promise<void>;
  save(entity: CalendarioLetivoEtapaEntity): Promise<CalendarioLetivoEtapaEntity>;
}
