import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioCreateInputDto";
import type { UsuarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneOutputDto";

export interface IUsuarioCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto>;
}
