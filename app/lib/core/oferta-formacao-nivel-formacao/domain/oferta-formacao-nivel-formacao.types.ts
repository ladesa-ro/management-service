import type { INivelFormacao } from "@/core/nivel-formacao/domain/nivel-formacao.types";
import type { IOfertaFormacao } from "@/core/oferta-formacao/domain/oferta-formacao.types";

export interface IOfertaFormacaoNivelFormacao {
  id: string;
  nivelFormacao: INivelFormacao;
  ofertaFormacao: IOfertaFormacao;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IOfertaFormacaoNivelFormacaoCreate {
  nivelFormacao: { id: string };
  ofertaFormacao: { id: string };
}
