import type { ICampus } from "@/v2/core/campus/domain/campus.types";
import type { IOfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.types";

export interface IGradeHorarioOfertaFormacao {
  id: string;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IGradeHorarioOfertaFormacaoCreate {
  campus: { id: string };
  ofertaFormacao: { id: string };
}
