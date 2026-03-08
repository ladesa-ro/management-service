import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AmbienteFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneInputDto";
import type { AmbienteFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneOutputDto";
import type { AmbienteUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteUpdateInputDto";

export interface IAmbienteUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto>;
}
