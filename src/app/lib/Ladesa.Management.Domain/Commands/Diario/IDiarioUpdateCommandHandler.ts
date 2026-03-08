import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneInputDto";
import type { DiarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneOutputDto";
import type { DiarioUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioUpdateInputDto";

export interface IDiarioUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto>;
}
