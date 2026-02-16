import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class UsuarioFieldsMixin {
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string | null;

  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  matriculaSiape?: string | null;

  @decorate(IsOptional())
  @decorate(IsEmail())
  email?: string | null;
}
