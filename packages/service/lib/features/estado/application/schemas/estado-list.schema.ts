import { EstadoListSettings, EstadoSchema } from "@/features/estado";
import { ListInputSchemaCustom, ListOutputSchemaCustom, makeReference, registerSchema, SchemaId } from "@/shared";

export const EstadoListInputSchema = registerSchema(SchemaId.EstadoListInput, ListInputSchemaCustom(EstadoListSettings));

export const EstadoListOutputItemSchema = registerSchema(SchemaId.EstadoListOutputItem, EstadoSchema);

export const EstadoListOutputSchema = registerSchema(
  SchemaId.EstadoListOutput,
  ListOutputSchemaCustom(
    makeReference(() => EstadoListOutputItemSchema),
    EstadoListSettings,
  ),
);
