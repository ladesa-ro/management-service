import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type EnderecoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneInputDto";
import { type EnderecoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneOutputDto";
import { type EnderecoInputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoInputDto";

export interface IEnderecoUseCasePort {
  findById(
    accessContext: AccessContext | null,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
  ): Promise<EnderecoFindOneOutputDto>;

  internalFindOneById(id: string): Promise<EnderecoFindOneOutputDto | null>;

  internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutputDto>;

  internalEnderecoCreateOrUpdate(
    id: string | null,
    dto: EnderecoInputDto,
  ): Promise<{ id: string | number }>;
}
