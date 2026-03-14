import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  EstagiarioCreateInputDto,
  EstagiarioFindOneInputDto,
  EstagiarioFindOneOutputDto,
  EstagiarioListInputDto,
  EstagiarioListOutputDto,
  EstagiarioUpdateInputDto,
} from "@/modules/estagio/estagiario/application/dtos";

/**
 * Symbol para injetar a porta de repositório
 */
export const ESTAGIARIO_REPOSITORY_PORT = Symbol("ESTAGIARIO_REPOSITORY_PORT");

/**
 * Interface da porta de repositório
 */
export interface IEstagiarioRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: EstagiarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<EstagiarioListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EstagiarioFindOneOutputDto | null>;

  create(
    accessContext: AccessContext,
    dto: EstagiarioCreateInputDto,
  ): Promise<EstagiarioFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    id: string,
    dto: EstagiarioUpdateInputDto,
  ): Promise<EstagiarioFindOneOutputDto>;

  delete(accessContext: AccessContext, id: string): Promise<void>;
}
