import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  CalendarioColecaoFields,
  CalendarioColecaoVisibilidadeSchema,
} from "./calendario-colecao.fields";
import { CalendarioColecaoVisibilidade } from "./calendario-colecao.types";

function camposConsistentes(data: { visibilidade?: string; campus?: unknown }) {
  if (data.visibilidade === CalendarioColecaoVisibilidade.CAMPUS) {
    return data.campus !== undefined && data.campus !== null;
  }
  return true;
}

const CAMPUS_OBRIGATORIO_MESSAGE = {
  message: "campus é obrigatório quando visibilidade é CAMPUS",
  path: ["campus"],
};

export const CalendarioColecaoSchema = z
  .object({
    id: uuidSchema,
    dono: ObjectIdUuidFactory.domain,
    campus: ObjectIdUuidFactoryNullable.domain,
    nome: CalendarioColecaoFields.nome.domainSchema,
    cor: CalendarioColecaoFields.cor.domainSchema,
    visibilidade: CalendarioColecaoVisibilidadeSchema,
  })
  .extend(datedSchema.shape)
  .refine(camposConsistentes, CAMPUS_OBRIGATORIO_MESSAGE);

export const CalendarioColecaoCreateSchema = createSchema((standard) =>
  z
    .object({
      dono: ObjectIdUuidFactory.create(standard).optional(),
      campus: ObjectIdUuidFactoryNullable.create(standard).optional(),
      nome: CalendarioColecaoFields.nome.create(standard),
      cor: CalendarioColecaoFields.cor.create(standard).optional(),
      visibilidade: CalendarioColecaoFields.visibilidade
        .create(standard)
        .optional()
        .default(CalendarioColecaoVisibilidade.PRIVADA),
    })
    .refine(camposConsistentes, CAMPUS_OBRIGATORIO_MESSAGE),
);

export const CalendarioColecaoUpdateSchema = createSchema(
  (standard) =>
    z.object({
      campus: ObjectIdUuidFactoryNullable.create(standard).optional(),
      nome: CalendarioColecaoFields.nome.create(standard).optional(),
      cor: CalendarioColecaoFields.cor.create(standard).optional(),
      visibilidade: CalendarioColecaoFields.visibilidade.create(standard).optional(),
    }),
);

export const CalendarioColecaoTransferirDonoSchema = createSchema((standard) =>
  z.object({
    novoDonoId: CalendarioColecaoFields.novoDonoId.create(standard),
  }),
);
