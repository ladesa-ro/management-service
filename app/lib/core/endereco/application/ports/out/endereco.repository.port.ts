import type { DeepPartial } from "typeorm";
import type {
  EnderecoFindOneInput,
  EnderecoFindOneOutput,
  EnderecoInputDto,
  EnderecoListInput,
  EnderecoListOutput,
} from "@/core/endereco";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

export const ENDERECO_REPOSITORY_PORT = Symbol("IEnderecoRepositoryPort");

export interface IEnderecoRepositoryPort {
  findAll(accessContext: AccessContext, dto: EnderecoListInput | null): Promise<EnderecoListOutput>;
  findById(accessContext: AccessContext | null, dto: EnderecoFindOneInput, selection?: string[] | boolean): Promise<EnderecoFindOneOutput | null>;
  findOneById(id: string): Promise<EnderecoFindOneOutput | null>;
  exists(id: string): Promise<boolean>;
  save(entity: DeepPartial<EnderecoEntity>): Promise<EnderecoEntity>;
  create(): EnderecoEntity;
  merge(entity: EnderecoEntity, data: EnderecoInputDto | DeepPartial<EnderecoEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
