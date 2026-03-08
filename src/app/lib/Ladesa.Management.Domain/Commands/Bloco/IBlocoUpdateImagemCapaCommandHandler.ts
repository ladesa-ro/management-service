import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneInputDto";

export interface IBlocoUpdateImagemCapaCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;
}
