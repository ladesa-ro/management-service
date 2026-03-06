import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Bloco } from "@/Ladesa.Management.Domain/Entities/Bloco";

/**
 * Tipagem para criação de Ambiente
 */
export interface AmbienteCreateDto {
  nome: string;

  descricao?: string | null;
  codigo: string;
  capacidade?: number | null;
  tipo?: string | null;

  bloco: IFindOneByIdDto<Bloco["id"]>;
}
