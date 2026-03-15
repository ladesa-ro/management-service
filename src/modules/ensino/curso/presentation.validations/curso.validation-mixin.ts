import { IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class CursoFieldsMixin {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsString()
  @MinLength(1)
  nomeAbreviado: string;
}
