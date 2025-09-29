import { Static } from "@sinclair/typebox";
import { EnderecoSchema } from "@/features/endereco/application/schemas";
import { Endereco } from "@/features/endereco/domain";

export type EnderecoDto = Endereco & Static<typeof EnderecoSchema>;
