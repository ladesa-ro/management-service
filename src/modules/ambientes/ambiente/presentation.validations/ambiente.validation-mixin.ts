import { IsInt, IsOptional, IsString, Min, MinLength } from "@/modules/@shared/presentation/shared";
export class AmbienteFieldsMixin {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string | null;

  @IsString()
  @MinLength(1)
  codigo: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade?: number | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;
}
