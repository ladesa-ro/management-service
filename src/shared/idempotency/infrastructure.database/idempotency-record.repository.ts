import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IIdempotencyRecord, IIdempotencyRecordRepository } from "../domain";
import { IdempotencyRecordTypeormEntity } from "./typeorm/idempotency-record.typeorm.entity";
import * as IdempotencyRecordTypeormMapper from "./typeorm/idempotency-record.typeorm.mapper";

@Impl()
export class IdempotencyRecordTypeOrmRepositoryAdapter implements IIdempotencyRecordRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findByChaveAndComando(chave: string, comando: string): Promise<IIdempotencyRecord | null> {
    const repo = this.appTypeormConnection.getRepository(IdempotencyRecordTypeormEntity);
    const entity = await repo.findOne({ where: { chave, comando } });
    if (!entity) return null;
    return IdempotencyRecordTypeormMapper.entityToDomain.map(entity);
  }

  async save(record: IIdempotencyRecord): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(IdempotencyRecordTypeormEntity);
    const entity = IdempotencyRecordTypeormMapper.domainToPersistence.map(record);
    await repo.save(entity);
  }
}
