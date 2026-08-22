import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { CalendarioColecaoAcessoFields } from "../calendario-colecao-acesso.fields";

export const CalendarioColecaoAcessoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioColecaoAcessoFields,
};

export class CalendarioColecaoAcessoFindOneQueryResult extends EntityQueryResult {
  colecao!: { id: string };
  escopo!: string;
  usuario!: UsuarioFindOneQueryResult | null;
  campus!: CampusFindOneQueryResult | null;
  papel!: string;
}
