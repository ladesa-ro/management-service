import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  EnderecoFindOneInput,
  EnderecoFindOneOutput,
  EnderecoInputDto,
} from "../../dtos";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IEnderecoUseCasePort {
  findById(accessContext: AccessContext | null, dto: EnderecoFindOneInput, selection?: string[] | boolean): Promise<EnderecoFindOneOutput | null>;
  findByIdStrict(accessContext: AccessContext, dto: EnderecoFindOneInput): Promise<EnderecoFindOneOutput>;
  internalFindOneById(id: string): Promise<EnderecoFindOneOutput | null>;
  internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutput>;
  internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto): Promise<EnderecoEntity>;
}
