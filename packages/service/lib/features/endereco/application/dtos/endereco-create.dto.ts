import { Static } from "@sinclair/typebox";
import { CidadeFindOneByIdInputDto } from "@/features/cidade";
import { EnderecoCreateInputSchema } from "@/features/endereco/application/schemas";

export type EnderecoCreateInputDto = Static<typeof EnderecoCreateInputSchema> & {
  cidade: CidadeFindOneByIdInputDto;
};
