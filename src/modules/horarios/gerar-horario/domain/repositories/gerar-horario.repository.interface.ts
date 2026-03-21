import type { FindOptionsWhere } from "typeorm";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

/**
 * Token de injecao para o repositorio de GerarHorario
 */
export const IGerarHorarioRepository = Symbol("IGerarHorarioRepository");

/**
 * Port de saida para operacoes de persistencia de GerarHorario
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IGerarHorarioRepository {
  findOneBy(where: FindOptionsWhere<GerarHorarioEntity>): Promise<GerarHorarioEntity | null>;
  save(entity: GerarHorarioEntity): Promise<GerarHorarioEntity>;
}
