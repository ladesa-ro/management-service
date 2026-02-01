import type { AccessContext } from "@/modules/@core/access-context";
import type { EnderecoEntity } from "@/modules/endereco/infrastructure/persistence/typeorm";
import type { EnderecoFindOneInput, EnderecoFindOneOutput, EnderecoInputDto } from "../../dtos";

export interface IEnderecoUseCasePort {
  findById(
    accessContext: AccessContext | null,
    dto: EnderecoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutput | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: EnderecoFindOneInput,
  ): Promise<EnderecoFindOneOutput>;

  internalFindOneById(id: string): Promise<EnderecoFindOneOutput | null>;

  internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutput>;

  internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto): Promise<EnderecoEntity>;
}
