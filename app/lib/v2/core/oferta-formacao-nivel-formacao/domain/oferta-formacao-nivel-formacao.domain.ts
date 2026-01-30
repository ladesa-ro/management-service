import type { NivelFormacao } from "@/v2/core/nivel-formacao/domain/nivel-formacao.domain";
import type { OfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.domain";
import type {
  IOfertaFormacaoNivelFormacao,
  IOfertaFormacaoNivelFormacaoCreate,
} from "./oferta-formacao-nivel-formacao.types";

export class OfertaFormacaoNivelFormacao implements IOfertaFormacaoNivelFormacao {
  id!: string;
  nivelFormacao!: NivelFormacao;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  static criar(dados: IOfertaFormacaoNivelFormacaoCreate): OfertaFormacaoNivelFormacao {
    const ofertaFormacaoNivelFormacao = new OfertaFormacaoNivelFormacao();
    return ofertaFormacaoNivelFormacao;
  }

  static fromData(dados: IOfertaFormacaoNivelFormacao): OfertaFormacaoNivelFormacao {
    const ofertaFormacaoNivelFormacao = new OfertaFormacaoNivelFormacao();
    Object.assign(ofertaFormacaoNivelFormacao, dados);
    return ofertaFormacaoNivelFormacao;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
