import type { IReadOnlyRepository } from "@/modules/@shared";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/modules/localidades/cidade";

/**
 * Token de injeção para o repositório de Cidade
 */
export const ICidadeRepository = Symbol("ICidadeRepository");

/**
 * Port de saída para operações de persistência de Cidade (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ICidadeRepository
  extends IReadOnlyRepository<
    CidadeListInputDto,
    CidadeListOutputDto,
    CidadeFindOneInputDto,
    CidadeFindOneOutputDto
  > {}
