import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { decorate } from "ts-mixer";

export class EnderecoFieldsMixin {
  @decorate(IsString())
  cep: string;

  @decorate(IsString())
  logradouro: string;

  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(99999))
  numero: number;

  @decorate(IsString())
  bairro: string;

  @decorate(IsOptional())
  @decorate(IsString())
  complemento?: string | null;

  @decorate(IsOptional())
  @decorate(IsString())
  pontoReferencia?: string | null;
}
