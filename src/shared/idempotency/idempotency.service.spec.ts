import { describe, expect, it, vi } from "vitest";
import type { IIdempotencyRecord } from "./domain/idempotency-record";
import type { IIdempotencyRecordRepository } from "./domain/idempotency-record.repository.interface";
import { IdempotencyService } from "./idempotency.service";

function createFakeRepository(): IIdempotencyRecordRepository & { records: IIdempotencyRecord[] } {
  const records: IIdempotencyRecord[] = [];

  return {
    records,
    async findByChaveAndComando(chave, comando) {
      return records.find((r) => r.chave === chave && r.comando === comando) ?? null;
    },
    async save(record) {
      records.push(record);
    },
  };
}

describe("IdempotencyService", () => {
  it("executes and saves the result on the first call with a key", async () => {
    const repository = createFakeRepository();
    const service = new IdempotencyService(repository);
    const run = vi.fn().mockResolvedValue({ id: "abc" });

    const resultado = await service.execute({
      idempotencyKey: "chave-1",
      comando: "meu-comando",
      run,
    });

    expect(resultado).toEqual({ id: "abc" });
    expect(run).toHaveBeenCalledTimes(1);
    expect(repository.records).toHaveLength(1);
    expect(repository.records[0]).toMatchObject({
      chave: "chave-1",
      comando: "meu-comando",
      resultado: { id: "abc" },
    });
  });

  it("returns the saved result without reexecuting on a second call with the same key", async () => {
    const repository = createFakeRepository();
    const service = new IdempotencyService(repository);
    const run = vi.fn().mockResolvedValue({ id: "abc" });

    const primeira = await service.execute({
      idempotencyKey: "chave-1",
      comando: "meu-comando",
      run,
    });
    const segunda = await service.execute({
      idempotencyKey: "chave-1",
      comando: "meu-comando",
      run,
    });

    expect(segunda).toEqual(primeira);
    expect(run).toHaveBeenCalledTimes(1);
    expect(repository.records).toHaveLength(1);
  });

  it("executes normally without saving anything when no key is sent", async () => {
    const repository = createFakeRepository();
    const service = new IdempotencyService(repository);
    const run = vi.fn().mockResolvedValue({ id: "abc" });

    await service.execute({ idempotencyKey: undefined, comando: "meu-comando", run });
    await service.execute({ idempotencyKey: undefined, comando: "meu-comando", run });

    expect(run).toHaveBeenCalledTimes(2);
    expect(repository.records).toHaveLength(0);
  });

  it("does not collide when the same key is used with a different comando", async () => {
    const repository = createFakeRepository();
    const service = new IdempotencyService(repository);
    const runA = vi.fn().mockResolvedValue({ resultado: "A" });
    const runB = vi.fn().mockResolvedValue({ resultado: "B" });

    const resultadoA = await service.execute({
      idempotencyKey: "chave-1",
      comando: "comando-a",
      run: runA,
    });
    const resultadoB = await service.execute({
      idempotencyKey: "chave-1",
      comando: "comando-b",
      run: runB,
    });

    expect(resultadoA).toEqual({ resultado: "A" });
    expect(resultadoB).toEqual({ resultado: "B" });
    expect(runA).toHaveBeenCalledTimes(1);
    expect(runB).toHaveBeenCalledTimes(1);
    expect(repository.records).toHaveLength(2);
  });
});
