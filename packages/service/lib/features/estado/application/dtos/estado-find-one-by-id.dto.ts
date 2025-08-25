import { Static, Type } from "@sinclair/typebox";
import { EstadoSchema } from "@/features/estado/application/dtos/estado.dto";
import { FindOneByIdInputSchemaCustom, FindOneByIdOutputSchemaCustom, registerSchema, SchemaId } from "@/shared-novo";

export const EstadoFindOneByIdInputSchema = registerSchema(SchemaId.EstadoFindOneByIdInput, FindOneByIdInputSchemaCustom(EstadoSchema));
export type EstadoFindOneByIdInputDto = Static<typeof EstadoFindOneByIdInputSchema>;

export const EstadoFindOneByIdOutputSchema = registerSchema(SchemaId.EstadoFindOneByIdOutput, FindOneByIdOutputSchemaCustom(Type.Pick(EstadoSchema, ["id", "nome", "sigla"])));
export type EstadoFindOneByIdOutputDto = Static<typeof EstadoFindOneByIdOutputSchema>;
