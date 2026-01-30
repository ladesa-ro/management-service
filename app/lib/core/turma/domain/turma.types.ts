import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { ICurso } from "@/core/curso";
import type { IImagem } from "@/core/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Turma
 * Tipagem pura sem implementação de regras
 */
export interface ITurma {
  id: string;
  periodo: string;
  ambientePadraoAula: IAmbiente | null;
  curso: ICurso;
  imagemCapa: IImagem | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar uma turma
 */
export interface ITurmaCreate {
  periodo: string;
  curso: { id: string };
  ambientePadraoAula?: { id: string } | null;
}

/**
 * Dados para atualização de turma
 */
export interface ITurmaUpdate {
  periodo?: string;
  curso?: { id: string };
  ambientePadraoAula?: { id: string } | null;
}
