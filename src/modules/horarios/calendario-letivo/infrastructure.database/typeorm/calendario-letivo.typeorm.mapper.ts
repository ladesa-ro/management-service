import type { DeepPartial } from "typeorm";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import type { CalendarioLetivoFindOneQueryResult } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioLetivoEntity } from "./calendario-letivo.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CalendarioLetivoEntity, ICalendarioLetivo>((e) => ({
  id: e.id,
  nome: e.nome,
  ano: e.ano,
  campus: e.campus as unknown as ICalendarioLetivo["campus"],
  ofertaFormacao: e.ofertaFormacao as unknown as ICalendarioLetivo["ofertaFormacao"],
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<
  CalendarioLetivoEntity,
  CalendarioLetivoFindOneQueryResult
>((e) => ({
  id: e.id,
  nome: e.nome,
  ano: e.ano,
  campus: e.campus as unknown as CalendarioLetivoFindOneQueryResult["campus"],
  ofertaFormacao:
    e.ofertaFormacao as unknown as CalendarioLetivoFindOneQueryResult["ofertaFormacao"],
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<
  ICalendarioLetivo,
  DeepPartial<CalendarioLetivoEntity>
>((d) => ({
  id: d.id,
  nome: d.nome,
  ano: d.ano,
  campus: pickId(d.campus),
  ofertaFormacao: d.ofertaFormacao ? pickId(d.ofertaFormacao) : undefined,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
