import { CidadeListSettings } from "@/features/cidade/application/queries/cidade-list.settings";
import { CidadeSchema } from "@/features/cidade/application/schemas/cidade.schema";
import { ListInputSchemaCustom, ListOutputSchemaCustom, makeReference, registerSchema, SchemaId } from "@/shared";

export const CidadeListInputSchema = registerSchema(SchemaId.CidadeListInput, ListInputSchemaCustom(CidadeListSettings));

export const CidadeListOutputItemSchema = registerSchema(SchemaId.CidadeListOutputItem, CidadeSchema);

export const CidadeListOutputSchema = registerSchema(
  SchemaId.CidadeListOutput,
  ListOutputSchemaCustom(
    makeReference(() => CidadeListOutputItemSchema),
    CidadeListSettings,
  ),
);
