import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Modalidade } from "@/Ladesa.Management.Domain/Entities/Modalidade";

/**
 * Dados para atualizacao de oferta de formacao
 */
export interface OfertaFormacaoUpdateDto {
  nome?: string;
  slug?: string;
  modalidade?: IFindOneByIdDto<Modalidade["id"]> | null;
}
