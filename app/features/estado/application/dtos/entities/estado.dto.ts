import type { AppSchemaType } from "@/shared/infrastructure/schemas/registry/app-schema.ts";
import type { EstadoEntity } from "../../../domain";
import type { EstadoSchema } from "../../schemas";

export type EstadoDto = AppSchemaType<typeof EstadoSchema> & EstadoEntity;
