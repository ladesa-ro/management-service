import type { DeepPartial } from "typeorm";
import { UsuarioTypeormMapper } from "@/modules/acesso/usuario/infrastructure.database/typeorm";
import { CampusTypeormMapper } from "@/modules/ambientes/campus/infrastructure.database/typeorm";
import type { ICalendarioColecaoAcesso } from "@/modules/calendario/colecao/domain/calendario-colecao-acesso";
import {
  CalendarioColecaoAcessoEscopo,
  CalendarioColecaoAcessoPapel,
} from "@/modules/calendario/colecao/domain/calendario-colecao-acesso.types";
import type { CalendarioColecaoAcessoFindOneQueryResult } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-acesso-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioColecaoAcessoEntity } from "./calendario-colecao-acesso.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CalendarioColecaoAcessoEntity, ICalendarioColecaoAcesso>(
  (e) => ({
    id: e.id,
    colecao: pickId(e.colecao),
    escopo: e.escopo,
    usuario: e.usuario ? pickId(e.usuario) : null,
    campus: e.campus ? pickId(e.campus) : null,
    papel: e.papel,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

export const entityToFindOneQueryResult = createMapper<
  CalendarioColecaoAcessoEntity,
  CalendarioColecaoAcessoFindOneQueryResult
>((e) => ({
  id: e.id,
  colecao: pickId(e.colecao),
  escopo: e.escopo,
  usuario: e.usuario ? UsuarioTypeormMapper.entityToFindOneQueryResult.map(e.usuario) : null,
  campus: e.campus ? CampusTypeormMapper.entityToFindOneQueryResult.map(e.campus) : null,
  papel: e.papel,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<
  ICalendarioColecaoAcesso,
  DeepPartial<CalendarioColecaoAcessoEntity>
>((d) => ({
  id: d.id,
  colecao: pickId(d.colecao),
  escopo: d.escopo as CalendarioColecaoAcessoEscopo,
  usuario: d.usuario ? pickId(d.usuario) : null,
  campus: d.campus ? pickId(d.campus) : null,
  papel: d.papel as CalendarioColecaoAcessoPapel,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
