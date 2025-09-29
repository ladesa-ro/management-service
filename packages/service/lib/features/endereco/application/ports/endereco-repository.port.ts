import { Endereco } from "@/features/endereco/domain";
import { EnderecoCreateInputDto, EnderecoFindOneByIdOutputDto, EnderecoUpdateInputDto } from "../dtos";

export const ENDERECO_REPOSITORY = Symbol("Ladesa.ManagementService.Endereco.Ports.Repository");

export interface IEnderecoRepositoryPort {
  findById(id: Endereco["id"], selection?: string[]): Promise<EnderecoFindOneByIdOutputDto | null>;

  create(inputDto: EnderecoCreateInputDto): Promise<{ id: Endereco["id"] }>;

  updateOneById(inputDto: EnderecoUpdateInputDto): Promise<{ id: Endereco["id"] }>;

  deleteOneById(id: Endereco["id"]): Promise<{ id: Endereco["id"] }>;
}
