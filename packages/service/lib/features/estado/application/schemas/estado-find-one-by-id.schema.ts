import { Type } from "@sinclair/typebox";
import { EstadoSchema } from "@/features/estado";
import { FindOneByIdInputSchemaCustom, FindOneByIdOutputSchemaCustom, registerSchema, SchemaId } from "@/shared";

export const EstadoFindOneByIdInputSchema = registerSchema(SchemaId.EstadoFindOneByIdInput, FindOneByIdInputSchemaCustom(EstadoSchema));

export const EstadoFindOneByIdOutputSchema = registerSchema(SchemaId.EstadoFindOneByIdOutput, FindOneByIdOutputSchemaCustom(Type.Pick(EstadoSchema, ["id", "nome", "sigla"])));
