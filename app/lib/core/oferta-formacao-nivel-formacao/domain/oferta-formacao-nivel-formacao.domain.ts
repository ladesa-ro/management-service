import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { NivelFormacao } from "@/core/nivel-formacao/domain/nivel-formacao.domain";
import type { OfertaFormacao } from "@/core/oferta-formacao/domain/oferta-formacao.domain";
import type {
  IOfertaFormacaoNivelFormacao,
  IOfertaFormacaoNivelFormacaoCreate,
} from "./oferta-formacao-nivel-formacao.types";

export class OfertaFormacaoNivelFormacao
  extends BaseEntity
  implements IOfertaFormacaoNivelFormacao
{
  id!: string;
  nivelFormacao!: NivelFormacao;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IOfertaFormacaoNivelFormacaoCreate): OfertaFormacaoNivelFormacao {
    const ofertaFormacaoNivelFormacao = new OfertaFormacaoNivelFormacao();
    return ofertaFormacaoNivelFormacao;
  }

  static fromData(dados: IOfertaFormacaoNivelFormacao): OfertaFormacaoNivelFormacao {
    const ofertaFormacaoNivelFormacao = new OfertaFormacaoNivelFormacao();
    Object.assign(ofertaFormacaoNivelFormacao, dados);
    return ofertaFormacaoNivelFormacao;
  }
}
