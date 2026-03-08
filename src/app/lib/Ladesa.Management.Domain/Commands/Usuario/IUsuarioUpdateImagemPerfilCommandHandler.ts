import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneInputDto";

export interface IUsuarioUpdateImagemPerfilCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;
}
