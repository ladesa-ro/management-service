import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "../../dtos";

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
