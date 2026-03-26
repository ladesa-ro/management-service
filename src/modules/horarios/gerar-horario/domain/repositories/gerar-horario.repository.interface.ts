import type { GerarHorario } from "../gerar-horario";

/**
 * Token de injecao para o repositorio de GerarHorario
 */

export const IGerarHorarioRepository = Symbol("IGerarHorarioRepository");

/**
 * Port de saida para operacoes de persistencia de GerarHorario.
 */

export interface IGerarHorarioRepository {
  /** Carrega o aggregate reconstituído. */
  loadById(id: string): Promise<GerarHorario | null>;

  /** Persiste o aggregate (create ou update), incluindo junções. */
  save(aggregate: GerarHorario): Promise<void>;
}
