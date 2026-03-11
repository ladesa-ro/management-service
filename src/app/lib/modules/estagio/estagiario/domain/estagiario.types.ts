import type { IEntityBase } from "@/modules/@shared";

/**
 * Interface que define a estrutura de dados de Estagiario
 * Tipagem pura sem implementação de regras
 */
export interface IEstagiario extends IEntityBase {
  idPerfilFk: string;
  idCursoFk: string;
  idTurmaFk: string;
  telefone: string;
  emailInstitucional?: string | null;
  dataNascimento: string;
  ativo?: boolean;
}

/**
 * Dados necessários para criar um estagiário
 */
export interface IEstagiarioCreate {
  idPerfilFk: string;
  idCursoFk: string;
  idTurmaFk: string;
  telefone: string;
  emailInstitucional?: string;
  dataNascimento: string;
}

/**
 * Dados para atualização de estagiário
 */
export interface IEstagiarioUpdate {
  idPerfilFk?: string;
  idCursoFk?: string;
  idTurmaFk?: string;
  telefone?: string;
  emailInstitucional?: string;
  dataNascimento?: string;
}
