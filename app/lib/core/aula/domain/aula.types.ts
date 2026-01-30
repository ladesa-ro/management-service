import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { IDiario } from "@/core/diario/domain/diario.types";
import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.types";

/**
 * Interface que define a estrutura de uma Aula
 */
export interface IAula {
  id: IdUuid;
  data: ScalarDateTimeString;
  modalidade: string | null;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
  ambiente: IAmbiente | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
