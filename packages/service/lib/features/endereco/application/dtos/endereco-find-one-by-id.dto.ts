import { Static } from "@sinclair/typebox";
import {
  EnderecoFindOneByIdInputSchema,
  EnderecoFindOneByIdOutputSchema
} from "@/features/endereco/application/schemas";

export type EnderecoFindOneByIdInputDto = Static<typeof EnderecoFindOneByIdInputSchema>;

export type EnderecoFindOneByIdOutputDto = Static<typeof EnderecoFindOneByIdOutputSchema>;
