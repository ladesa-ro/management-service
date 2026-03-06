import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type NivelFormacao } from "@/Ladesa.Management.Domain/Entities/NivelFormacao";
import { type OfertaFormacao } from "@/Ladesa.Management.Domain/Entities/OfertaFormacao";

export interface OfertaFormacaoNivelFormacaoCreateDto {
  nivelFormacao: IFindOneByIdDto<NivelFormacao["id"]>;
  ofertaFormacao: IFindOneByIdDto<OfertaFormacao["id"]>;
}
