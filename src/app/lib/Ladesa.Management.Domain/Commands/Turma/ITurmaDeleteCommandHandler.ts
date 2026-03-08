import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { TurmaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneInputDto";

export interface ITurmaDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: TurmaFindOneInputDto): Promise<boolean>;
}
