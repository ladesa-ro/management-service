import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { TurmaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaCreateInputDto";
import type { TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";

export interface ITurmaCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: TurmaCreateInputDto,
  ): Promise<TurmaFindOneOutputDto>;
}
