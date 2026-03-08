import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneInputDto";
import type { UsuarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneOutputDto";

export interface IUsuarioFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto>;
}
