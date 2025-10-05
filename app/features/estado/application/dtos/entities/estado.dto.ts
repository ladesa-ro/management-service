import type { Type } from "typebox";
import type { EstadoEntity } from "../../../domain";
import type { EstadoDtoSchema } from "../../schemas";

export type EstadoDto = Type.Static<typeof EstadoDtoSchema> & EstadoEntity;
