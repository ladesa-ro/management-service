import type { DeepPartial } from "typeorm";
import type {
  ICalendarioLetivoDia,
  TipoCalendarioLetivoDia,
} from "@/modules/calendario/letivo/domain/calendario-letivo-dia";
import type { CalendarioLetivoDiaFindOneQueryResult } from "@/modules/calendario/letivo/domain/queries/calendario-letivo-dia-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import { entityToFindOneQueryResult as calendarioLetivoEntityToFindOneQueryResult } from "./calendario-letivo.typeorm.mapper";
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

export const entityToFindOneQueryResult = createMapper<
  CalendarioLetivoDiaEntity,
  CalendarioLetivoDiaFindOneQueryResult
>((e) => ({
  id: e.id,
  data: e.data,
  diaLetivo: e.diaLetivo,
  feriado: e.feriado,
  diaPresencial: e.diaPresencial,
  tipo: e.tipo,
  extraCurricular: e.extraCurricular,
  calendario: calendarioLetivoEntityToFindOneQueryResult.map(e.calendario),
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
