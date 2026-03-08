import type { EnderecoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneOutputDto";

export interface IEnderecoInternalFindOneByIdQueryHandler {
  execute(id: string): Promise<EnderecoFindOneOutputDto | null>;
}
