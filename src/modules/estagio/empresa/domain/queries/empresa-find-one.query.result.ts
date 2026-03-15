import { EntityQueryResult } from "@/domain/abstractions";

export class EmpresaFindOneQueryResult extends EntityQueryResult {
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  idEnderecoFk!: string;
  ativo!: boolean;
}
