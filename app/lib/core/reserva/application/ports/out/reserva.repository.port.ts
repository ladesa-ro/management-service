import type { DeepPartial } from "typeorm";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  ReservaFindOneInput,
  ReservaFindOneOutput,
  ReservaListInput,
  ReservaListOutput,
} from "../../dtos";

export const RESERVA_REPOSITORY_PORT = Symbol("RESERVA_REPOSITORY_PORT");

export interface IReservaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: ReservaListInput | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutput>;

  findById(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ReservaFindOneOutput | null>;

  save(reserva: DeepPartial<ReservaEntity>): Promise<ReservaEntity>;

  create(): ReservaEntity;

  merge(reserva: ReservaEntity, data: DeepPartial<ReservaEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
