import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Campus } from "@/Ladesa.Management.Domain/Entities/Campus";
import { type OfertaFormacao } from "@/Ladesa.Management.Domain/Entities/OfertaFormacao";

/**
 * Dados para atualizacao de curso
 */
export interface CursoUpdateDto {
  nome?: string;
  nomeAbreviado?: string;
  campus?: IFindOneByIdDto<Campus["id"]>;
  ofertaFormacao?: IFindOneByIdDto<OfertaFormacao["id"]>;
}
