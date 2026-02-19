import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/modules/localidades/cidade";
import type { IReadOnlyRepositoryPort } from "@/modules/@shared";

/**
 * Token de injeção para o repositório de Cidade
 */
export const CIDADE_REPOSITORY_PORT = Symbol("ICidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Cidade (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ICidadeRepositoryPort
  extends IReadOnlyRepositoryPort<
    CidadeListInputDto,
    CidadeListOutputDto,
    CidadeFindOneInputDto,
    CidadeFindOneOutputDto
  > {}
