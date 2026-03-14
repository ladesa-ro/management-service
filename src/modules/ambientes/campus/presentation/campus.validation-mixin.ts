import { IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class CampusFieldsMixin {
  @IsString()
  @MinLength(1)
  nomeFantasia: string;

  @IsString()
  @MinLength(1)
  razaoSocial: string;

  @IsString()
  @MinLength(1)
  apelido: string;

  @IsString()
  @MinLength(1)
  cnpj: string;
}
