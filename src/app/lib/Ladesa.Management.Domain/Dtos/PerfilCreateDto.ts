import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Campus } from "@/Ladesa.Management.Domain/Entities/Campus";
import { type Usuario } from "@/Ladesa.Management.Domain/Entities/Usuario";

/**
 * Dados necessários para criar um perfil
 */
export interface PerfilCreateDto {
  cargo: string;
  campus: IFindOneByIdDto<Campus["id"]>;
  usuario: IFindOneByIdDto<Usuario["id"]>;
}
