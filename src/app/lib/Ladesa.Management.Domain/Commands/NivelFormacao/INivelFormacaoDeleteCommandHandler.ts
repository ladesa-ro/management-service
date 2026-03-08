import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { NivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneInputDto";

export interface INivelFormacaoDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: NivelFormacaoFindOneInputDto): Promise<boolean>;
}
