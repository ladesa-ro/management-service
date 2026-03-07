import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { ModalidadeFindOneOutputDto } from "./ModalidadeFindOneOutputDto";

export class OfertaFormacaoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  slug!: string;
  modalidade!: ModalidadeFindOneOutputDto;
}
