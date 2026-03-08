import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { UsuarioEnsinoOutput } from "@/Ladesa.Management.Domain/Dtos/UsuarioEnsinoOutput";
import type { UsuarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioFindOneInputDto";

export interface IUsuarioEnsinoByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioEnsinoOutput>;
}
