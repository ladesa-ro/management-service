import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Campus } from "@/Ladesa.Management.Domain/Entities/Campus";
import { type OfertaFormacao } from "@/Ladesa.Management.Domain/Entities/OfertaFormacao";

/**
 * Dados necessarios para criar um curso
 */
export interface CursoCreateDto {
  nome: string;
  nomeAbreviado: string;
  campus: IFindOneByIdDto<Campus["id"]>;
  ofertaFormacao: IFindOneByIdDto<OfertaFormacao["id"]>;
}
