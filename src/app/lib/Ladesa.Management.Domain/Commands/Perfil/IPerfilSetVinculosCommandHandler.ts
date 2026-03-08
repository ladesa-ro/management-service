import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { PerfilListOutputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilListOutputDto";
import type { PerfilSetVinculosInputDto } from "@/Ladesa.Management.Domain/Dtos/PerfilSetVinculosInputDto";

export interface IPerfilSetVinculosCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: PerfilSetVinculosInputDto,
  ): Promise<PerfilListOutputDto>;
}
