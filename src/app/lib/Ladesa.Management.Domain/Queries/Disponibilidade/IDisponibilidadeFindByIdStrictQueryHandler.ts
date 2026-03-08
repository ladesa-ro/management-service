import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneInputDto";
import type { DisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneOutputDto";

export interface IDisponibilidadeFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;
}
