import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneInputDto";

export interface IDiarioDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: DiarioFindOneInputDto): Promise<boolean>;
}
