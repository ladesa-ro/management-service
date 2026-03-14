import { IsEmail, IsOptional, IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class UsuarioFieldsMixin {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  matricula?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string | null;
}
