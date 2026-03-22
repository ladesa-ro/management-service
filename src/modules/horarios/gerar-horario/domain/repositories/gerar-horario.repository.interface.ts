import type { IGerarHorario } from "../gerar-horario.types";

/**
 * Token de injecao para o repositorio de GerarHorario
 */
export const IGerarHorarioRepository = Symbol("IGerarHorarioRepository");

/**
 * Port de saida para operacoes de persistencia de GerarHorario
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IGerarHorarioRepository {
  findOneBy(where: Partial<Record<keyof IGerarHorario, unknown>>): Promise<IGerarHorario | null>;
  save(entity: Partial<IGerarHorario>): Promise<IGerarHorario>;
}
