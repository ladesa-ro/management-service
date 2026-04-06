import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "@/modules/ensino/diario/domain/queries";
import { createMapper } from "@/shared/mapping";
import * as DiarioTypeormMapper from "./diario.typeorm.mapper";
import type { DiarioPreferenciaAgrupamentoEntity } from "./diario-preferencia-agrupamento.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToFindOneQueryResult = createMapper<
  DiarioPreferenciaAgrupamentoEntity,
  DiarioPreferenciaAgrupamentoFindOneQueryResult
>((e) => ({
  id: e.id,
  modo: e.modo,
  ordem: e.ordem,
  dataInicio: e.dataInicio,
  dataFim: e.dataFim,
  diaSemanaIso: e.diaSemanaIso,
  aulasSeguidas: e.aulasSeguidas,
  diario: DiarioTypeormMapper.entityToFindOneQueryResult.map(e.diario),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));
