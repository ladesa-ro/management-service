import { Campus } from "../../campus/domain/campus.domain";
import { OfertaFormacao } from "../../oferta-formacao/domain/oferta-formacao.domain";

export class GradeHorarioOfertaFormacao {
  id!: string;
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
