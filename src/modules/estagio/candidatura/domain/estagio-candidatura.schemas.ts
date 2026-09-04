import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  EstagioCandidaturaFields,
  EstagioCandidaturaSituacaoSchema,
} from "./estagio-candidatura.fields";

export const EstagioCandidaturaSchema = z
  .object({
    id: uuidSchema,
    estagio: ObjectIdUuidFactory.domain,
    estagiario: ObjectIdUuidFactory.domain,
    situacao: EstagioCandidaturaSituacaoSchema,
    dataInscricao: z.string(),
    dataOferta: z.string().nullable(),
    expiraEm: z.string().nullable(),
    dataResposta: z.string().nullable(),
    dataCancelamento: z.string().nullable(),
    autorConvocacao: ObjectIdUuidFactoryNullable.domain,
    motivoCancelamento: z.string().max(1000).nullable(),
  })
  .extend(datedSchema.shape);

export const EstagioCandidaturaCreateSchema = createSchema((standard) =>
  z.object({
    estagio: ObjectIdUuidFactory.create(standard),
    estagiario: ObjectIdUuidFactory.create(standard),
    situacao: EstagioCandidaturaFields.situacao.create(standard).optional(),
    dataInscricao: z.string().optional(),
  }),
);
