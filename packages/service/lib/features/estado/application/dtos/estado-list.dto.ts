import { Static } from "@sinclair/typebox";
import { EstadoSchema } from "@/features/estado/application/dtos/estado.dto";
import { EstadoListSettings } from "@/features/estado/application/queries/estado-list.settings";
import { registerSchema, SchemaId } from "@/shared-novo";
import {
  ListInputDtoCustom,
  ListInputSchemaCustom,
  ListOutputDtoCustom,
  ListOutputSchemaCustom
} from "@/shared-novo/resource/queries/features/list";

export const EstadoListInputSchema = registerSchema(SchemaId.EstadoListInput, ListInputSchemaCustom(EstadoListSettings));
export type EstadoListInputDto = ListInputDtoCustom;

export const EstadoListOutputItemSchema = registerSchema(SchemaId.EstadoListOutputItem, EstadoSchema);
export type EstadoListOutputItemDto = Static<typeof EstadoListOutputItemSchema>;

export const EstadoListOutputSchema = registerSchema(SchemaId.EstadoListOutput, ListOutputSchemaCustom(EstadoListOutputItemSchema, EstadoListSettings));
export type EstadoListOutputDto = ListOutputDtoCustom<EstadoListOutputItemDto>;
