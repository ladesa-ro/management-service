import { Campus } from "../../campus/domain/campus.domain";
import { OfertaFormacao } from "../../oferta-formacao/domain/oferta-formacao.domain";

export class CalendarioLetivo {
  id!: string;
  nome!: string;
  ano!: number;
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
