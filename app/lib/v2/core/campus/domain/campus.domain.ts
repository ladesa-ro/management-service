import { Endereco } from "../../endereco/domain/endereco.domain";

export class Campus {
  id!: string;
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: Endereco;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
