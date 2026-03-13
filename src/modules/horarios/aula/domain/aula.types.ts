import type { IdUuid, IEntityBase, ScalarDateTimeString } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente.types";
import type { IDiario } from "@/modules/ensino/diario/domain/diario.types";
import type { IIntervaloDeTempo } from "@/modules/horarios/intervalo-de-tempo/domain/intervalo-de-tempo.types";

/**
 * Interface que define a estrutura de uma Aula
 */
export interface IAula extends IEntityBase {
  data: ScalarDateTimeString;
  modalidade: string | null;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
  ambiente: IAmbiente | null;
}

/**
 * Interface para criação de Aula
 */
export interface IAulaCreate {
  data: ScalarDateTimeString;
  modalidade?: string | null;
  intervaloDeTempo: { id: IdUuid } | { periodoInicio: string; periodoFim: string };
  diario: { id: IdUuid };
  ambiente?: { id: IdUuid } | null;
}

/**
 * Interface para atualização de Aula
 */
export interface IAulaUpdate {
  data?: ScalarDateTimeString;
  modalidade?: string | null;
  intervaloDeTempo?: { id: IdUuid } | { periodoInicio: string; periodoFim: string };
  diario?: { id: IdUuid };
  ambiente?: { id: IdUuid } | null;
}
