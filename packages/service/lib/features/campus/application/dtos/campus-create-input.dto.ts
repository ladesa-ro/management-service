import { Static } from "@sinclair/typebox";
import { CampusCreateInputSchema } from "@/features/campus/application/schemas";
import { EnderecoCreateInputDto } from "@/features/endereco";

export type CampusCreateInputDto = Static<typeof CampusCreateInputSchema> & {
  endereco: EnderecoCreateInputDto;
};
