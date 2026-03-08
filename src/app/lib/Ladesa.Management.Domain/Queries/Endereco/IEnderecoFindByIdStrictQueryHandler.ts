import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EnderecoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneInputDto";
import type { EnderecoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneOutputDto";

export interface IEnderecoFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
  ): Promise<EnderecoFindOneOutputDto>;
}
