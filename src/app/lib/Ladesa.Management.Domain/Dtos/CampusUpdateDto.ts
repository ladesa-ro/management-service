import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Cidade } from "@/Ladesa.Management.Domain/Entities/Cidade";

/**
 * Tipagem para atualização de Campus
 */
export interface CampusUpdateDto {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: number;
    bairro?: string;
    complemento?: string | null;
    pontoReferencia?: string | null;
    cidade?: IFindOneByIdDto<Cidade["id"]>;
  };
}
