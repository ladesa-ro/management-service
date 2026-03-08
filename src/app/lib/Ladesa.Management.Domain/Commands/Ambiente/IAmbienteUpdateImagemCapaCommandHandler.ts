import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AmbienteFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneInputDto";

export interface IAmbienteUpdateImagemCapaCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;
}
