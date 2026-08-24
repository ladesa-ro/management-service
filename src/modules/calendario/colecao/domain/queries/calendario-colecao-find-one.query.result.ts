import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { CalendarioColecaoFields } from "../calendario-colecao.fields";

export const CalendarioColecaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioColecaoFields,
};

export class CalendarioColecaoFindOneQueryResult extends EntityQueryResult {
  dono!: UsuarioFindOneQueryResult;
  campus!: CampusFindOneQueryResult | null;
  nome!: string;
  cor!: string | null;
  visibilidade!: string;
}
