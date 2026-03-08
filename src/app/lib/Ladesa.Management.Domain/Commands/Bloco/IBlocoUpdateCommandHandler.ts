import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneInputDto";
import type { BlocoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneOutputDto";
import type { BlocoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoUpdateInputDto";

export interface IBlocoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto>;
}
