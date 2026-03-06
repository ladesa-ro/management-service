import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { INivelFormacao } from "@/Ladesa.Management.Application/ensino/nivel-formacao/domain/nivel-formacao.types";
import type { IOfertaFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao/domain/oferta-formacao.types";

export interface IOfertaFormacaoNivelFormacao extends IEntityBase {
  nivelFormacao: INivelFormacao;
  ofertaFormacao: IOfertaFormacao;
}

export interface IOfertaFormacaoNivelFormacaoCreate {
  nivelFormacao: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}
