import type { EnderecoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoFindOneOutputDto";

export interface IEnderecoInternalFindOneByIdStrictQueryHandler {
  execute(id: string): Promise<EnderecoFindOneOutputDto>;
}
