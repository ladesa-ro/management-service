import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { INivelFormacao } from "@/modules/nivel-formacao/domain/nivel-formacao.types";
import type { IOfertaFormacao } from "@/modules/oferta-formacao/domain/oferta-formacao.types";

export interface IOfertaFormacaoNivelFormacao extends IEntityBase {
  nivelFormacao: INivelFormacao;
  ofertaFormacao: IOfertaFormacao;
}

export interface IOfertaFormacaoNivelFormacaoCreate {
  nivelFormacao: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}
