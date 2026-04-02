import { CampusInputRef } from "@/modules/ambientes/campus";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivoFields } from "../calendario-letivo.fields";

export const CalendarioLetivoUpdateCommandFields = {
  nome: CalendarioLetivoFields.nome,
  ano: CalendarioLetivoFields.ano,
  campus: CalendarioLetivoFields.campus,
  ofertaFormacao: CalendarioLetivoFields.ofertaFormacao,
};

export class CalendarioLetivoUpdateCommand {
  nome?: string;
  ano?: number;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
}
