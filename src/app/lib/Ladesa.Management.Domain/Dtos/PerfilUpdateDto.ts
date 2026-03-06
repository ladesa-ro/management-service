import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Campus } from "@/Ladesa.Management.Domain/Entities/Campus";
import { type Usuario } from "@/Ladesa.Management.Domain/Entities/Usuario";

/**
 * Dados para atualização de perfil
 */
export interface PerfilUpdateDto {
  ativo?: boolean;
  cargo?: string;
  campus?: IFindOneByIdDto<Campus["id"]>;
  usuario?: IFindOneByIdDto<Usuario["id"]>;
}
