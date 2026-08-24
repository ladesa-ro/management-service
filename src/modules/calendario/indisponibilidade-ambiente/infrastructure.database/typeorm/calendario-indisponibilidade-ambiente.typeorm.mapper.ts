import type { DeepPartial } from "typeorm";
import { AmbienteTypeormMapper } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm";
import type { ICalendarioIndisponibilidadeAmbiente } from "@/modules/calendario/indisponibilidade-ambiente/domain/calendario-indisponibilidade-ambiente";
import { CalendarioIndisponibilidadeAmbienteTipo } from "@/modules/calendario/indisponibilidade-ambiente/domain/calendario-indisponibilidade-ambiente.types";
import type { CalendarioIndisponibilidadeAmbienteFindOneQueryResult } from "@/modules/calendario/indisponibilidade-ambiente/domain/queries/calendario-indisponibilidade-ambiente-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioIndisponibilidadeAmbienteEntity } from "./calendario-indisponibilidade-ambiente.typeorm.entity";

export const entityToDomain = createMapper<
  CalendarioIndisponibilidadeAmbienteEntity,
  ICalendarioIndisponibilidadeAmbiente
>((e) => ({
  id: e.id,
  ambiente: pickId(e.ambiente),
  tipo: e.tipo,
  diaSemana: e.diaSemana,
  data: e.data,
  inicio: e.inicio,
  fim: e.fim,
  motivo: e.motivo,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  CalendarioIndisponibilidadeAmbienteEntity,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult
>((e) => ({
  id: e.id,
  ambiente: AmbienteTypeormMapper.entityToFindOneQueryResult.map(e.ambiente),
  tipo: e.tipo,
  diaSemana: e.diaSemana,
  data: e.data,
  inicio: e.inicio,
  fim: e.fim,
  motivo: e.motivo,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const domainToPersistence = createMapper<
  ICalendarioIndisponibilidadeAmbiente,
  DeepPartial<CalendarioIndisponibilidadeAmbienteEntity>
>((d) => ({
  id: d.id,
  ambiente: pickId(d.ambiente),
  tipo: d.tipo as CalendarioIndisponibilidadeAmbienteTipo,
  diaSemana: d.diaSemana,
  data: d.data,
  inicio: d.inicio,
  fim: d.fim,
  motivo: d.motivo,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
