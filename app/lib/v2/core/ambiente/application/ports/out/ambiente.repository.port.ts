import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
} from "@/v2/adapters/in/http/ambiente/dto";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IAmbienteRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null>;

  save(ambiente: DeepPartial<AmbienteEntity>): Promise<AmbienteEntity>;
  create(): AmbienteEntity;
  merge(ambiente: AmbienteEntity, data: DeepPartial<AmbienteEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
