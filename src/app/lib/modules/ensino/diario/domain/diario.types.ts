import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem.types";
import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente.types";
import type { IDisciplina } from "@/modules/ensino/disciplina/domain/disciplina.types";
import type { ITurma } from "@/modules/ensino/turma/domain/turma.types";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo";

/**
 * Interface que define a estrutura de dados de Diario
 */
export interface IDiario extends IEntityBase {
  ativo: boolean;
  calendarioLetivo: ICalendarioLetivo;
  turma: ITurma;
  disciplina: IDisciplina;
  ambientePadrao: IAmbiente | null;
  imagemCapa: IImagem | null;
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
