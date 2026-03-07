import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class UsuarioFindOneOutputDto extends EntityOutputDto {
  nome!: string | null;
  matriculaSiape!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: ImagemFindOneOutputDto | null;
  imagemPerfil!: ImagemFindOneOutputDto | null;
}
