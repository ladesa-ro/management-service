import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneInputDto";
import type { DisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneOutputDto";
import type { DisponibilidadeUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeUpdateInputDto";

export interface IDisponibilidadeUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;
}
