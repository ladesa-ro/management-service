import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneOutputDto";

export interface IDisponibilidadeFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
  ): Promise<DisponibilidadeFindOneOutputDto>;
}
