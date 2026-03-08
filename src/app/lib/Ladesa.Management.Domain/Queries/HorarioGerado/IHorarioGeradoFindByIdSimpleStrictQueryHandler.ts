import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneOutputDto";

export interface IHorarioGeradoFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto>;
}
