import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { INivelFormacao } from "@/core/nivel-formacao/domain/nivel-formacao.types";
import type { IOfertaFormacao } from "@/core/oferta-formacao/domain/oferta-formacao.types";

export interface IOfertaFormacaoNivelFormacao {
  id: IdUuid;
  nivelFormacao: INivelFormacao;
  ofertaFormacao: IOfertaFormacao;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IOfertaFormacaoNivelFormacaoCreate {
  nivelFormacao: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}
