import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";
import type { IDiario } from "@/v2/core/diario/domain/diario.types";
import type { IIntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.types";

/**
 * Interface que define a estrutura de uma Aula
 */
export interface IAula {
  id: string;
  data: Date;
  modalidade: string | null;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
  ambiente: IAmbiente | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Interface para criação de Aula
 */
export interface IAulaCreate {
  data: Date;
  modalidade?: string | null;
  intervaloDeTempo: { id: string } | { periodoInicio: string; periodoFim: string };
  diario: { id: string };
  ambiente?: { id: string } | null;
}

/**
 * Interface para atualização de Aula
 */
export interface IAulaUpdate {
  data?: Date;
  modalidade?: string | null;
  intervaloDeTempo?: { id: string } | { periodoInicio: string; periodoFim: string };
  diario?: { id: string };
  ambiente?: { id: string } | null;
}
