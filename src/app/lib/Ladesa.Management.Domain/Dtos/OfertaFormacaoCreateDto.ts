import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Modalidade } from "@/Ladesa.Management.Domain/Entities/Modalidade";

/**
 * Dados necessarios para criar uma oferta de formacao
 */
export interface OfertaFormacaoCreateDto {
  nome: string;
  slug: string;
  modalidade?: IFindOneByIdDto<Modalidade["id"]>;
}
