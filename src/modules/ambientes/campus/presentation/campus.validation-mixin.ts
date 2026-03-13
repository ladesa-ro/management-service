import { IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";

export class CampusFieldsMixin {
  @decorate(IsString())
  @decorate(MinLength(1))
  nomeFantasia: string;

  @decorate(IsString())
  @decorate(MinLength(1))
  razaoSocial: string;

  @decorate(IsString())
  @decorate(MinLength(1))
  apelido: string;

  @decorate(IsString())
  @decorate(MinLength(1))
  cnpj: string;
}
