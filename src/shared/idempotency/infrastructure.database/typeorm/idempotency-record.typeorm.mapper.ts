import type { DeepPartial } from "typeorm";
import { createMapper } from "@/shared/mapping";
import type { IIdempotencyRecord } from "../../domain";
import type { IdempotencyRecordTypeormEntity } from "./idempotency-record.typeorm.entity";

export const entityToDomain = createMapper<IdempotencyRecordTypeormEntity, IIdempotencyRecord>(
  (e) => ({
    id: e.id,
    chave: e.chave,
    comando: e.comando,
    resultado: e.resultado,
    dateCreated: e.dateCreated,
  }),
);

export const domainToPersistence = createMapper<
  IIdempotencyRecord,
  DeepPartial<IdempotencyRecordTypeormEntity>
>((d) => ({
  id: d.id,
  chave: d.chave,
  comando: d.comando,
  resultado: d.resultado,
  dateCreated: d.dateCreated,
}));
