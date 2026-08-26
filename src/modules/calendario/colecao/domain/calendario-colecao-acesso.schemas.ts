import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  CalendarioColecaoAcessoEscopoSchema,
  CalendarioColecaoAcessoFields,
  CalendarioColecaoAcessoPapelSchema,
} from "./calendario-colecao-acesso.fields";
import { CalendarioColecaoAcessoEscopo } from "./calendario-colecao-acesso.types";

function escopoAlvoConsistente(data: { escopo?: string; usuario?: unknown; campus?: unknown }) {
  const temUsuario = data.usuario !== undefined && data.usuario !== null;
  const temCampus = data.campus !== undefined && data.campus !== null;

  if (data.escopo === CalendarioColecaoAcessoEscopo.USUARIO) return temUsuario && !temCampus;
  if (data.escopo === CalendarioColecaoAcessoEscopo.CAMPUS) return temCampus && !temUsuario;
  if (data.escopo === CalendarioColecaoAcessoEscopo.PUBLICO) return !temUsuario && !temCampus;
  return true;
}

const ESCOPO_ALVO_INCONSISTENTE_MESSAGE = {
  message:
    "o alvo do acesso deve corresponder exatamente ao escopo: USUARIO exige usuario (e não campus), CAMPUS exige campus (e não usuario), PUBLICO não aceita nenhum dos dois",
  path: ["escopo"],
};

export const CalendarioColecaoAcessoSchema = z
  .object({
    id: uuidSchema,
    colecao: ObjectIdUuidFactory.domain,
    escopo: CalendarioColecaoAcessoEscopoSchema,
    usuario: ObjectIdUuidFactoryNullable.domain,
    campus: ObjectIdUuidFactoryNullable.domain,
    papel: CalendarioColecaoAcessoPapelSchema,
  })
  .extend(datedSchema.shape)
  .refine(escopoAlvoConsistente, ESCOPO_ALVO_INCONSISTENTE_MESSAGE);

export const CalendarioColecaoAcessoCreateSchema = createSchema((standard) =>
  z
    .object({
      colecao: ObjectIdUuidFactory.create(standard).optional(),
      escopo: CalendarioColecaoAcessoFields.escopo.create(standard),
      usuario: ObjectIdUuidFactoryNullable.create(standard).optional(),
      campus: ObjectIdUuidFactoryNullable.create(standard).optional(),
      papel: CalendarioColecaoAcessoFields.papel.create(standard),
    })
    .refine(escopoAlvoConsistente, ESCOPO_ALVO_INCONSISTENTE_MESSAGE),
);
