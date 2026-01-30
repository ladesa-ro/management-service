import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
} from "@/v2/server/modules/reserva/http/dto";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IReservaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: ReservaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null>;

  save(reserva: DeepPartial<ReservaEntity>): Promise<ReservaEntity>;

  create(): ReservaEntity;

  merge(reserva: ReservaEntity, data: DeepPartial<ReservaEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
