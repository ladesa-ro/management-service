import { Static } from "@sinclair/typebox";
import { CidadeFindOneByIdInputDto } from "@/features/cidade";
import { EnderecoCreateInputDto } from "@/features/endereco/application/dtos/endereco-create.dto";
import { EnderecoCreateOrUpdateInputSchema } from "@/features/endereco/application/schemas";

export type EnderecoCreateOrUpdateInputDto = Static<typeof EnderecoCreateOrUpdateInputSchema> & {
  targetEntity: CidadeFindOneByIdInputDto | null;
  data: EnderecoCreateInputDto;
};
