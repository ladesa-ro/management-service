/**
 * @deprecated Use `createMapper` de `@/shared/mapping/create-mapper` em vez deste arquivo.
 * Este módulo será removido após a migração completa de todos os mappers.
 */

import {
  type BidirectionalField,
  createBidirectionalMapping,
  createMapping,
  type FieldMapping,
} from "@/shared/mapping";
import {
  dateStringToDate,
  dateToDateString,
  dateToISO,
  isoToDate,
  normalizeRelationRef,
} from "@/shared/mapping/transforms";

type TransformFn = (value: unknown) => unknown;

// ============================================================================
// Types
// ============================================================================

export type EntityDomainField =
  | string
  | { field: string; type: "date" }
  | { field: string; type: "date-only" }
  | { field: string; type: "relation" }
  | { field: string; type: "relation-loaded" }
  | { field: string; entityField?: string; forward: TransformFn; reverse: TransformFn };

export interface EntityDomainMapper<
  TDomainData = Record<string, unknown>,
  TPersistenceData = Record<string, unknown>,
  TOutputData = TDomainData,
> {
  /** TypeORM Entity → dados para Domain.load() */
  toDomainData(entity: Record<string, unknown>): TDomainData;
  /** Domain → dados para TypeORM save */
  toPersistenceData(domain: Record<string, unknown>): TPersistenceData;
  /** TypeORM Entity → dados para Output DTO (query result) */
  toOutputData(entity: Record<string, unknown>): TOutputData;
}

export interface EntityDomainMapperConfig {
  /** Campos bidirecionais domain ↔ entity */
  fields: EntityDomainField[];
  /** Campos unidirecionais entity → output DTO. Se omitido, toOutputData reutiliza toDomainData. */
  output?: FieldMapping[];
}

// ============================================================================
// createEntityDomainMapper
// ============================================================================

function toBidirectionalField(f: EntityDomainField): BidirectionalField {
  if (typeof f === "string") return f;

  if ("type" in f) {
    switch (f.type) {
      case "date":
        return [f.field, dateToISO, isoToDate];
      case "date-only":
        return [f.field, dateToDateString, dateStringToDate];
      case "relation":
        // Entity: Relation<T> (loaded object) ↔ Domain: { id: string }
        // Forward: normaliza para { id }. Reverse: passthrough (TypeORM aceita { id }).
        return [f.field, normalizeRelationRef, (v: unknown) => v];
      case "relation-loaded":
        // Entity: Relation<T> (loaded object) ↔ Domain: objeto completo
        // Forward: passthrough (domain recebe objeto inteiro). Reverse: normaliza para { id }.
        return [f.field, (v: unknown) => v, normalizeRelationRef];
    }
  }

  return f.entityField
    ? [f.entityField, f.field, f.forward, f.reverse]
    : [f.field, f.forward, f.reverse];
}

export function createEntityDomainMapper<
  TDomainData = Record<string, unknown>,
  TPersistenceData = Record<string, unknown>,
  TOutputData = TDomainData,
>(
  config: EntityDomainMapperConfig,
): EntityDomainMapper<TDomainData, TPersistenceData, TOutputData> {
  const { fields, output } = config;

  const bidirectional = createBidirectionalMapping(fields.map(toBidirectionalField));
  const outputMapping = output ? createMapping(output) : null;

  return {
    toDomainData: (entity) => bidirectional.forward.map(entity),
    toPersistenceData: (domain) => bidirectional.reverse.map(domain),
    toOutputData: (entity) =>
      outputMapping ? outputMapping.map(entity) : bidirectional.forward.map(entity),
  };
}
