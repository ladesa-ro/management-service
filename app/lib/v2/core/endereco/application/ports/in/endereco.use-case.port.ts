import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "@/v2/server/modules/endereco/http/dto";

/**
 * Port de entrada para casos de uso de Endereco
 * Define o contrato que o service deve implementar
 */
export interface IEnderecoUseCasePort {
  /**
   * Busca um endereço por ID (interno, sem contexto de acesso)
   */
  internalFindOneById(id: string): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Busca um endereço por ID (interno, lança exceção se não encontrado)
   */
  internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutputDto>;

  /**
   * Cria ou atualiza um endereço
   */
  internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto): Promise<{ id: string }>;

  /**
   * Busca um endereço por ID
   */
  findById(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null>;

  /**
   * Busca um endereço por ID (lança exceção se não encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
  ): Promise<EnderecoFindOneOutputDto>;
}
