import { CampusInputRef } from "@/modules/ambientes/campus";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";

export class CalendarioLetivoUpdateCommand {
  nome?: string;
  ano?: number;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
}
