import type { AccessContext } from "@/modules/@core/access-context";
import type { EnderecoEntity } from "@/modules/endereco/infrastructure/persistence/typeorm";
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

  internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto): Promise<EnderecoEntity>;
}
