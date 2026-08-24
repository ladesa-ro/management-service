import { QueryFailedError } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { getNowISO } from "@/utils/date";
import {
  IIdempotencyRecordRepository,
  type IIdempotencyRecordRepository as IIdempotencyRecordRepositoryType,
} from "./domain";
import type {
  IIdempotencyExecuteParams,
  IIdempotencyService,
} from "./idempotency.service.interface";

const POSTGRES_UNIQUE_VIOLATION = "23505";

function isUniqueViolation(error: unknown): boolean {
  return (
    error instanceof QueryFailedError &&
    (error as unknown as { code?: string }).code === POSTGRES_UNIQUE_VIOLATION
  );
}

@Impl()
export class IdempotencyService implements IIdempotencyService {
  constructor(
    @Dep(IIdempotencyRecordRepository)
    private readonly repository: IIdempotencyRecordRepositoryType,
  ) {}

  async execute<T>({ idempotencyKey, comando, run }: IIdempotencyExecuteParams<T>): Promise<T> {
    if (!idempotencyKey) {
      return run();
    }

    const existing = await this.repository.findByChaveAndComando(idempotencyKey, comando);
    if (existing) {
      // O resultado gravado é o JSON devolvido pela primeira execução — não é
      // reconstruído como entidade de domínio (constructor privado, sem
      // Class.load aqui) porque o único uso dele é ser devolvido como
      // resposta, nunca ter seus métodos chamados de novo.
      return existing.resultado as T;
    }

    const resultado = await run();

    try {
      await this.repository.save({
        id: generateUuidV7(),
        chave: idempotencyKey,
        comando,
        resultado,
        dateCreated: getNowISO(),
      });
    } catch (error) {
      // Duas chamadas concorrentes com a mesma Idempotency-Key passaram pelo
      // check acima antes de qualquer uma gravar — a segunda perde a corrida
      // pela constraint única (chave, comando). Em vez de propagar o erro cru,
      // devolve o resultado que a primeira já gravou, honrando a garantia de
      // idempotência mesmo sob concorrência.
      if (isUniqueViolation(error)) {
        const concorrente = await this.repository.findByChaveAndComando(idempotencyKey, comando);
        if (concorrente) {
          return concorrente.resultado as T;
        }
      }

      throw error;
    }

    return resultado;
  }
}
