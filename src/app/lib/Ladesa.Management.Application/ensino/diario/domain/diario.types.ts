import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { IAmbiente } from "@/Ladesa.Management.Application/ambientes/ambiente/domain/ambiente.types";
import type { IImagem } from "@/Ladesa.Management.Application/armazenamento/imagem/domain/imagem.types";
import type { IDisciplina } from "@/Ladesa.Management.Application/ensino/disciplina/domain/disciplina.types";
import type { ITurma } from "@/Ladesa.Management.Application/ensino/turma/domain/turma.types";
import type { ICalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";

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
