import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { ICalendarioLetivo } from "@/core/calendario-letivo";
import type { IDisciplina } from "@/core/disciplina/domain/disciplina.types";
import type { IImagem } from "@/core/imagem/domain/imagem.types";
import type { ITurma } from "@/core/turma/domain/turma.types";

/**
 * Interface que define a estrutura de dados de Diario
 */
export interface IDiario {
  id: IdUuid;
  ativo: boolean;
  calendarioLetivo: ICalendarioLetivo;
  turma: ITurma;
  disciplina: IDisciplina;
  ambientePadrao: IAmbiente | null;
  imagemCapa: IImagem | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IDiarioCreate {
  ativo?: boolean;
  calendarioLetivo: { id: IdUuid };
  turma: { id: IdUuid };
  disciplina: { id: IdUuid };
  ambientePadrao?: { id: IdUuid } | null;
}

export interface IDiarioUpdate {
  ativo?: boolean;
  calendarioLetivo?: { id: IdUuid };
  turma?: { id: IdUuid };
  disciplina?: { id: IdUuid };
  ambientePadrao?: { id: IdUuid } | null;
}
