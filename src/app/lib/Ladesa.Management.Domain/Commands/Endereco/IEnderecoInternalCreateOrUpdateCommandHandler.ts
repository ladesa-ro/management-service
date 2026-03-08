import type { EnderecoInputDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoInputDto";

export interface IEnderecoInternalCreateOrUpdateCommandHandler {
  execute(
    id: string | null,
    dto: EnderecoInputDto,
  ): Promise<{ id: string | number }>;
}
