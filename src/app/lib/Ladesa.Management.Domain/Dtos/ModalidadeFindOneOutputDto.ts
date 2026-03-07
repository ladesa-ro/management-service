import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";

export class ModalidadeFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  slug!: string;
}
