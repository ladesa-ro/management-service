import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EnderecoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneInputDto";
import type { EnderecoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneOutputDto";

export interface IEnderecoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null>;
}
