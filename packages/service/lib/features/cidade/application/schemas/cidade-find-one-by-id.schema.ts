import { Type } from "@sinclair/typebox";
import { CidadeSchema } from "@/features/cidade/application/schemas/cidade.schema";
import { FindOneByIdInputSchemaCustom, FindOneByIdOutputSchemaCustom, registerSchema, SchemaId } from "@/shared";

export const CidadeFindOneByIdInputSchema = registerSchema(SchemaId.CidadeFindOneByIdInput, FindOneByIdInputSchemaCustom(CidadeSchema));

export const CidadeFindOneByIdOutputSchema = registerSchema(SchemaId.CidadeFindOneByIdOutput, FindOneByIdOutputSchemaCustom(Type.Pick(CidadeSchema, ["id", "nome", "estado"])));
