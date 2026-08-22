import type { DeepPartial } from "typeorm";
import { UsuarioTypeormMapper } from "@/modules/acesso/usuario/infrastructure.database/typeorm";
import { CampusTypeormMapper } from "@/modules/ambientes/campus/infrastructure.database/typeorm";
import type { ICalendarioColecao } from "@/modules/calendario/colecao/domain/calendario-colecao";
import { CalendarioColecaoVisibilidade } from "@/modules/calendario/colecao/domain/calendario-colecao.types";
import type { CalendarioColecaoFindOneQueryResult } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioColecaoEntity } from "./calendario-colecao.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CalendarioColecaoEntity, ICalendarioColecao>((e) => ({
  id: e.id,
  dono: pickId(e.dono),
  campus: e.campus ? pickId(e.campus) : null,
  nome: e.nome,
  cor: e.cor,
  visibilidade: e.visibilidade,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  CalendarioColecaoEntity,
  CalendarioColecaoFindOneQueryResult
>((e) => ({
  id: e.id,
  dono: UsuarioTypeormMapper.entityToFindOneQueryResult.map(e.dono),
  campus: e.campus ? CampusTypeormMapper.entityToFindOneQueryResult.map(e.campus) : null,
  nome: e.nome,
  cor: e.cor,
  visibilidade: e.visibilidade,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<
  ICalendarioColecao,
  DeepPartial<CalendarioColecaoEntity>
>((d) => ({
  id: d.id,
  dono: pickId(d.dono),
  campus: d.campus ? pickId(d.campus) : null,
  nome: d.nome,
  cor: d.cor,
  visibilidade: d.visibilidade as CalendarioColecaoVisibilidade,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
