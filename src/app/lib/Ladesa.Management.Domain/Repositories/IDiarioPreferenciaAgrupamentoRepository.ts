import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { DiarioPreferenciaAgrupamento } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento";
import { type DiarioPreferenciaAgrupamentoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioPreferenciaAgrupamentoFindOneOutputDto";
import { type DiarioPreferenciaAgrupamentoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioPreferenciaAgrupamentoListOutputDto";
import { type DiarioPreferenciaAgrupamentoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioPreferenciaAgrupamentoEntity";

/**
 * Token de injeção para o repositório de DiarioPreferenciaAgrupamento
 */
export const IDiarioPreferenciaAgrupamentoRepository = Symbol(
  "IDiarioPreferenciaAgrupamentoRepository",
);

/**
 * Port de saída para operações de persistência de DiarioPreferenciaAgrupamento
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioPreferenciaAgrupamentoRepository
  extends IBaseCrudRepositoryPort<
    DiarioPreferenciaAgrupamento,
    DiarioPreferenciaAgrupamentoListOutputDto,
    DiarioPreferenciaAgrupamentoFindOneOutputDto
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity>;
}
