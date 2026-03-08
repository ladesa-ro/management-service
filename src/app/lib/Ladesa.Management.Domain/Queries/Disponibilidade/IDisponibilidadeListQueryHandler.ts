import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeListInputDto";
import type { DisponibilidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeListOutputDto";

export interface IDisponibilidadeListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null,
  ): Promise<DisponibilidadeListOutputDto>;
}
