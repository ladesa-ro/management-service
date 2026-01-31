import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambiente/domain/ambiente.types";
import type { ICurso } from "@/modules/curso";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Turma
 * Tipagem pura sem implementação de regras
 */
export interface ITurma {
  id: IdUuid;
  periodo: string;
  ambientePadraoAula: IAmbiente | null;
  curso: ICurso;
  imagemCapa: IImagem | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Dados necessários para criar uma turma
 */
export interface ITurmaCreate {
  periodo: string;
  curso: { id: IdUuid };
  ambientePadraoAula?: { id: IdUuid } | null;
}

/**
 * Dados para atualização de turma
 */
export interface ITurmaUpdate {
  periodo?: string;
  curso?: { id: IdUuid };
  ambientePadraoAula?: { id: IdUuid } | null;
}
