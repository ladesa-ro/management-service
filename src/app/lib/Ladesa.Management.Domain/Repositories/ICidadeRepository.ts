import type { IReadOnlyRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/Ladesa.Management.Application/localidades/cidade";

/**
 * Token de injeção para o repositório de Cidade
 */
export const ICidadeRepository = Symbol("ICidadeRepository");

/**
 * Port de saída para operações de persistência de Cidade (read-only)
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ICidadeRepository
  extends IReadOnlyRepositoryPort<
    CidadeListInputDto,
    CidadeListOutputDto,
    CidadeFindOneInputDto,
    CidadeFindOneOutputDto
  > {}
