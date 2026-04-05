import { CampusInputRef } from "@/modules/ambientes/campus";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivoFields } from "../calendario-letivo.fields";
import type { ICalendarioLetivoEtapaInput } from "./calendario-letivo-create.command";

export const CalendarioLetivoUpdateCommandFields = {
  nome: CalendarioLetivoFields.nome,
  ano: CalendarioLetivoFields.ano,
  campus: CalendarioLetivoFields.campus,
  ofertaFormacao: CalendarioLetivoFields.ofertaFormacao,
  situacao: CalendarioLetivoFields.situacao,
};

export class CalendarioLetivoUpdateCommand {
  nome?: string;
  ano?: number;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
  situacao?: string;
  etapas?: ICalendarioLetivoEtapaInput[];
}
