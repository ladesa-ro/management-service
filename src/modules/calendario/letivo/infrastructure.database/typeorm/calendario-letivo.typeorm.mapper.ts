import type { DeepPartial } from "typeorm";
import { CampusTypeormMapper } from "@/modules/ambientes/campus/infrastructure.database/typeorm";
import {
  CalendarioLetivoSituacao,
  type ICalendarioLetivo,
} from "@/modules/calendario/letivo/domain/calendario-letivo";
import type { CalendarioLetivoFindOneQueryResult } from "@/modules/calendario/letivo/domain/queries/calendario-letivo-find-one.query.result";
import { OfertaFormacaoTypeormMapper } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioLetivoEntity } from "./calendario-letivo.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CalendarioLetivoEntity, ICalendarioLetivo>((e) => ({
  id: e.id,
  nome: e.nome,
  ano: e.ano,
  campus: pickId(e.campus),
  ofertaFormacao: e.ofertaFormacao ? pickId(e.ofertaFormacao) : null,
  situacao: e.situacao,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  CalendarioLetivoEntity,
  CalendarioLetivoFindOneQueryResult
>((e) => ({
  id: e.id,
  nome: e.nome,
  ano: e.ano,
  campus: CampusTypeormMapper.entityToFindOneQueryResult.map(e.campus),
  ofertaFormacao: OfertaFormacaoTypeormMapper.entityToFindOneQueryResult.map(e.ofertaFormacao),
  situacao: e.situacao,
  etapas: (e.etapas ?? [])
    .filter((etapa) => !etapa.dateDeleted)
    .map((etapa) => ({
      id: etapa.id,
      identificadorExterno: etapa.identificadorExterno,
      version: etapa.version,
      ofertaFormacaoPeriodoEtapaId: etapa.ofertaFormacaoPeriodoEtapa?.id ?? "",
      nome: etapa.nome,
      cor: etapa.cor,
      ordem: etapa.ordem,
      numeroPeriodo: etapa.numeroPeriodo,
      dataInicio: String(etapa.dataInicio),
      dataTermino: String(etapa.dataTermino),
    })),
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
  situacao: d.situacao as CalendarioLetivoSituacao,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
