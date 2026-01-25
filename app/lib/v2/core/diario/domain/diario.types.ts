import type { IAmbiente } from "@/v2/core/ambiente/domain/ambiente.types";
import type { ICalendarioLetivo } from "@/v2/core/calendario-letivo/domain/calendario-letivo.types";
import type { IDisciplina } from "@/v2/core/disciplina/domain/disciplina.types";
import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";
import type { ITurma } from "@/v2/core/turma/domain/turma.types";

/**
 * Interface que define a estrutura de dados de Diario
 */
export interface IDiario {
  id: string;
  ativo: boolean;
  calendarioLetivo: ICalendarioLetivo;
  turma: ITurma;
  disciplina: IDisciplina;
  ambientePadrao: IAmbiente | null;
  imagemCapa: IImagem | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IDiarioCreate {
  ativo?: boolean;
  calendarioLetivo: { id: string };
  turma: { id: string };
  disciplina: { id: string };
  ambientePadrao?: { id: string } | null;
}

export interface IDiarioUpdate {
  ativo?: boolean;
  calendarioLetivo?: { id: string };
  turma?: { id: string };
  disciplina?: { id: string };
  ambientePadrao?: { id: string } | null;
}
