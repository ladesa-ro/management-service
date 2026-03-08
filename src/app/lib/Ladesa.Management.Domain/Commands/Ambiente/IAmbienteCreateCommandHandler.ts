import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AmbienteCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteCreateInputDto";
import type { AmbienteFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneOutputDto";

export interface IAmbienteCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto>;
}
