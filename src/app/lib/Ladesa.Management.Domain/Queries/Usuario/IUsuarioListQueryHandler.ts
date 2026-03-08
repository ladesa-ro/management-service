import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioListInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioListInputDto";
import type { UsuarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioListOutputDto";

export interface IUsuarioListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: UsuarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto>;
}
