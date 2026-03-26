import type { DeepPartial } from "typeorm";
import type {
  ICalendarioLetivoDia,
  TipoCalendarioLetivoDia,
} from "@/modules/horarios/calendario-letivo/domain/calendario-letivo-dia";
import type { CalendarioLetivoDiaFindOneQueryResult } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-dia-find-one.query.result";
import type { CalendarioLetivoFindOneQueryResult } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioLetivoDiaEntity } from "./calendario-letivo-dia.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CalendarioLetivoDiaEntity, ICalendarioLetivoDia>(
  (e) => ({
    id: e.id,
    data: e.data,
    diaLetivo: e.diaLetivo,
    feriado: e.feriado,
    diaPresencial: e.diaPresencial,
    tipo: e.tipo,
    extraCurricular: e.extraCurricular,
    calendario: pickId(e.calendario),
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

export const entityToOutput = createMapper<
  CalendarioLetivoDiaEntity,
  CalendarioLetivoDiaFindOneQueryResult
>((e) => ({
  id: e.id,
  data: e.data as unknown as CalendarioLetivoDiaFindOneQueryResult["data"],
  diaLetivo: e.diaLetivo,
  feriado: e.feriado,
  diaPresencial: e.diaPresencial,
  tipo: e.tipo,
  extraCurricular: e.extraCurricular,
  calendario: e.calendario as unknown as CalendarioLetivoFindOneQueryResult,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<
  ICalendarioLetivoDia,
  DeepPartial<CalendarioLetivoDiaEntity>
>((d) => ({
  id: d.id,
  data: d.data,
  diaLetivo: d.diaLetivo,
  feriado: d.feriado,
  diaPresencial: d.diaPresencial,
  tipo: d.tipo as TipoCalendarioLetivoDia,
  extraCurricular: d.extraCurricular,
  calendario: pickId(d.calendario),
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
