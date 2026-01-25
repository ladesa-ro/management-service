import { NivelFormacao } from "../../nivel-formacao/domain/nivel-formacao.domain";
import { OfertaFormacao } from "../../oferta-formacao/domain/oferta-formacao.domain";

export class OfertaFormacaoNivelFormacao {
  id!: string;
  nivelFormacao!: NivelFormacao;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
