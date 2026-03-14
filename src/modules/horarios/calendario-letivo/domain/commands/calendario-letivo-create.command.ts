import { CampusInputRef } from "@/modules/ambientes/campus";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";

export class CalendarioLetivoCreateCommand {
  nome!: string;
  ano!: number;
  campus!: CampusInputRef;
  ofertaFormacao!: OfertaFormacaoInputRef;
}
