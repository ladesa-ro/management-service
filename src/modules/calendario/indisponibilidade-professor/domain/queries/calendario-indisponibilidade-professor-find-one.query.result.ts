import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries";
import { CalendarioIndisponibilidadeProfessorFields } from "../calendario-indisponibilidade-professor.fields";

export const CalendarioIndisponibilidadeProfessorFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioIndisponibilidadeProfessorFields,
};

export class CalendarioIndisponibilidadeProfessorFindOneQueryResult extends EntityQueryResult {
  perfil!: PerfilFindOneQueryResult;
  tipo!: string;
  diaSemana!: number | null;
  data!: string | null;
  inicio!: string;
  fim!: string;
  motivo!: string | null;
}
