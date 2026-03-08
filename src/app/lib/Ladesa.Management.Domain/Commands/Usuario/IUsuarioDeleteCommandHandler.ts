import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneInputDto";

export interface IUsuarioDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: UsuarioFindOneInputDto): Promise<boolean>;
}
