import { IsInt, IsString, Min, MinLength } from "@/modules/@shared/presentation/shared";
export class DisciplinaFieldsMixin {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @IsInt()
  @Min(1)
  cargaHoraria: number;
}
