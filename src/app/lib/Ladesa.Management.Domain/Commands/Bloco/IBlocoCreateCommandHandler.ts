import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoCreateInputDto";
import type { BlocoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneOutputDto";

export interface IBlocoCreateCommandHandler {
  execute(accessContext: AccessContext, dto: BlocoCreateInputDto): Promise<BlocoFindOneOutputDto>;
}
