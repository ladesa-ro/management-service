import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem.types";
import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente.types";
import type { ICurso } from "@/modules/ensino/curso";

/**
 * Interface que define a estrutura de dados de Turma
 * Tipagem pura sem implementação de regras
 */
export interface ITurma extends IEntityBase {
  periodo: string;
  ambientePadraoAula: IAmbiente | null;
  curso: ICurso;
  imagemCapa: IImagem | null;
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
