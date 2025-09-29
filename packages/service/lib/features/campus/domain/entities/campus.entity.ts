import { Endereco } from "@/features/endereco";
import { BaseDatedEntity, BaseUuidEntity } from "@/shared";

export type Campus = BaseUuidEntity &
  BaseDatedEntity & {
  nomeFantasia: string;
  razaoSocial: string;
  apelido: string;
  cnpj: string;

  endereco: Endereco;
};
