import { IsInt, IsOptional, IsString, Max, Min } from "@/modules/@shared/presentation/shared";
export class EnderecoFieldsMixin {
  @IsString()
  cep: string;

  @IsString()
  logradouro: string;

  @IsInt()
  @Min(0)
  @Max(99999)
  numero: number;

  @IsString()
  bairro: string;

  @IsOptional()
  @IsString()
  complemento?: string | null;

  @IsOptional()
  @IsString()
  pontoReferencia?: string | null;
}
