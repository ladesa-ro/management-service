import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiarioCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioCreateInputDto";
import type { DiarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneOutputDto";

export interface IDiarioCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DiarioCreateInputDto,
  ): Promise<DiarioFindOneOutputDto>;
}
