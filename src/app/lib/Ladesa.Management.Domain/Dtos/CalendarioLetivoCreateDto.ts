import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Campus } from "@/Ladesa.Management.Domain/Entities/Campus";
import { type OfertaFormacao } from "@/Ladesa.Management.Domain/Entities/OfertaFormacao";

/**
 * Dados necessarios para criar um calendario letivo
 */
export interface CalendarioLetivoCreateDto {
  nome: string;
  ano: number;
  campus: IFindOneByIdDto<Campus["id"]>;
  ofertaFormacao?: IFindOneByIdDto<OfertaFormacao["id"]>;
}
