import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IImagem } from "@/modules/base/armazenamento/imagem/domain/imagem.types";
import type { ICurso } from "@/modules/ensino/curso";
import type { IAmbiente } from "@/modules/sisgea/ambiente/domain/ambiente.types";

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
