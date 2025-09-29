import { Static } from "@sinclair/typebox";
import { CidadeFindOneByIdInputDto } from "@/features/cidade";
import { EnderecoFindOneByIdInputDto } from "@/features/endereco/application/dtos/endereco-find-one-by-id.dto";
import { EnderecoUpdateInputSchema } from "@/features/endereco/application/schemas";

export type EnderecoUpdateInputDto = Static<typeof EnderecoUpdateInputSchema> & {
  targetEntity: EnderecoFindOneByIdInputDto;

  data: {
    cidade?: CidadeFindOneByIdInputDto;
  };
};
