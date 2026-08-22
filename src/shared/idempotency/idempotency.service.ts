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

    await this.repository.save({
      id: generateUuidV7(),
      chave: idempotencyKey,
      comando,
      resultado,
      dateCreated: getNowISO(),
    });

    return resultado;
  }
}
