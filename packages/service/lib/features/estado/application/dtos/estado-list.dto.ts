import { Static } from "@sinclair/typebox";
import { EstadoListOutputItemSchema } from "@/features/estado";
import { ListInputDtoCustom, ListOutputDtoCustom } from "@/shared";

export type EstadoListInputDto = ListInputDtoCustom;

export type EstadoListOutputItemDto = Static<typeof EstadoListOutputItemSchema>;

export type EstadoListOutputDto = ListOutputDtoCustom<EstadoListOutputItemDto>;
