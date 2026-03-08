import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneInputDto";
import type { UsuarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneOutputDto";
import type { UsuarioUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioUpdateInputDto";

export interface IUsuarioUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto>;
}
