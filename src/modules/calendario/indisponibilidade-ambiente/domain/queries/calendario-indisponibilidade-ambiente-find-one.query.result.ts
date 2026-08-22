import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente/domain/queries";
import { CalendarioIndisponibilidadeAmbienteFields } from "../calendario-indisponibilidade-ambiente.fields";

export const CalendarioIndisponibilidadeAmbienteFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioIndisponibilidadeAmbienteFields,
};

export class CalendarioIndisponibilidadeAmbienteFindOneQueryResult extends EntityQueryResult {
  ambiente!: AmbienteFindOneQueryResult;
  tipo!: string;
  diaSemana!: number | null;
  data!: string | null;
  inicio!: string;
  fim!: string;
  motivo!: string | null;
}
