import { Static } from "@sinclair/typebox";
import { CidadeListOutputItemSchema } from "@/features/cidade/application/schemas";
import { ListInputDtoCustom, ListOutputDtoCustom } from "@/shared";

export type CidadeListInputDto = ListInputDtoCustom;

export type CidadeListOutputItemDto = Static<typeof CidadeListOutputItemSchema>;

export type CidadeListOutputDto = ListOutputDtoCustom<CidadeListOutputItemDto>;
