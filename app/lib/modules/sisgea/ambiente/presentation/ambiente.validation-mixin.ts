import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class AmbienteFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  nome: string;

  @decorate(IsOptional())
  @decorate(IsString())
  descricao?: string | null;

  @decorate(IsString())
  @decorate(MinLength(1))
  codigo: string;

  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(0))
  capacidade?: number | null;

  @decorate(IsOptional())
  @decorate(IsString())
  tipo?: string | null;
}
