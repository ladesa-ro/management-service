import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AmbienteFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneInputDto";

export interface IAmbienteDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: AmbienteFindOneInputDto): Promise<boolean>;
}
