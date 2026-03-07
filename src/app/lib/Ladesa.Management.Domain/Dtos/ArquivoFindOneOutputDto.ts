import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";

export class ArquivoFindOneOutputDto extends EntityOutputDto {
  name!: string | null;
  mimeType!: string | null;
  sizeBytes!: number | null;
  storageType!: string;
}
