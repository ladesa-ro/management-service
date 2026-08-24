import type { IIdempotencyRecord } from "./idempotency-record";

export const IIdempotencyRecordRepository = Symbol("IIdempotencyRecordRepository");

export interface IIdempotencyRecordRepository {
  findByChaveAndComando(chave: string, comando: string): Promise<IIdempotencyRecord | null>;

  save(record: IIdempotencyRecord): Promise<void>;
}
