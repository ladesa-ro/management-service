import type { IReadOnlyRepositoryPort } from "@/core/@shared";
import {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
} from "@/core/cidade";

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
    CidadeListInput,
    CidadeListOutput,
    CidadeFindOneInput,
    CidadeFindOneOutput
  > {}
