/**
 * Estagio — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EstagioFields, EstagioStatusSchema } from "./estagio.fields";

// ============================================================================
// Fragments de referência / estruturais
// ============================================================================

export const TimeFormatSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/,
    "formato de hora inválido (HH:MM ou HH:MM:SS)",
  );

export const HorarioEstagioSchema = z.object({
  id: z.string().optional(),
  diaSemana: z.number().int().min(0, "dia da semana mínimo é 0").max(6, "dia da semana máximo é 6"),
  horaInicio: TimeFormatSchema.nullable(),
  horaFim: TimeFormatSchema.nullable(),
});

export const HorarioEstagioInputSchema = z
  .object({
    diaSemana: z.number().int().min(0).max(6),
    horaInicio: z.preprocess(
      (v) => (v === "" || v === undefined ? null : v),
      TimeFormatSchema.nullable(),
    ),
    horaFim: z.preprocess(
      (v) => (v === "" || v === undefined ? null : v),
      TimeFormatSchema.nullable(),
    ),
  })
  .refine(
    (h) => {
      const toMinutes = (t: string) => {
        const [hour, minute, second] = t.split(":").map(Number);
        return hour * 60 + minute + (second ? second / 60 : 0);
      };
      if (!h.horaInicio || !h.horaFim) return true;
      return toMinutes(h.horaFim) > toMinutes(h.horaInicio);
    },
    { message: "hora de fim deve ser maior que hora de início", path: ["horaFim"] },
  );

export const DateStringSchema = z
  .string()
  .refine((val) => !isNaN(new Date(val).getTime()), "data inválida");

export const EstagioEmpresaRefSchema = ObjectIdUuidFactory;

export const EstagioEstagiarioRefSchema = ObjectIdUuidFactory;

export const EstagioCursoRefSchema = ObjectIdUuidFactoryNullable;

// ============================================================================
// Schemas compostos
// ============================================================================

export const EstagioSchema = z
  .object({
    id: uuidSchema,
    campus: ObjectIdUuidFactory.domain,
    empresa: ObjectIdUuidFactory.domain,
    CursoReferencia: EstagioCursoRefSchema.domain,
    estagiario: ObjectIdUuidFactoryNullable.domain,
    usuarioOrientador: ObjectIdUuidFactoryNullable.domain,
    cargaHoraria: z.number().int().min(1),
    dataInicio: z.string().nullable(),
    dataFim: z.string().nullable(),
    status: EstagioStatusSchema,
    nomeSupervisor: z.string().max(255).nullable(),
    emailSupervisor: z.string().email().max(255).nullable(),
    telefoneSupervisor: z.string().max(20).nullable(),
    aditivo: z.boolean(),
    tipoAditivo: z.string().max(255).nullable(),
    horariosEstagio: z.array(HorarioEstagioSchema),
    // Campos adicionais do CSV
    dataPrevistaFim: z.string().nullable(),
    nomeSeguradora: z.string().max(255).nullable(),
    numeroApoliceSeguro: z.string().max(100).nullable(),
    visitasRealizadas: z.number().int().min(0).nullable(),
    visitasJustificadas: z.number().int().min(0).nullable(),
    visitasAVencer: z.number().int().min(0).nullable(),
    visitasNaoRealizadas: z.number().int().min(0).nullable(),
    resumoPendencias: z.string().max(1000).nullable(),
    encerramentoPor: z.string().max(255).nullable(),
    motivacaoDesligamento: z.string().max(1000).nullable(),
    motivoRescisao: z.string().max(1000).nullable(),
    mediaNotasSupervisor: z.number().min(0).max(10).nullable(),
    foiOuSeraContratado: z.boolean().nullable(),
  })
  .extend(datedSchema.shape);

export const EstagioCreateSchema = createSchema((standard) =>
  z
    .object({
      campus: z.preprocess((v: any) => {
        if (v === null || v === undefined) return undefined;
        if (typeof v === "object" && v !== null && "id" in v) {
          const id = (v as { id?: unknown }).id;
          if (id === "" || id === null) return undefined;
        }
        return v;
      }, ObjectIdUuidFactory.create(standard).optional()),
      empresa: z.preprocess(
        (v) => (typeof v === "string" ? { id: v } : v),
        EstagioEmpresaRefSchema.create(standard),
      ),
      estagiario: ObjectIdUuidFactoryNullable.create(standard).optional(),
      usuarioOrientador: ObjectIdUuidFactoryNullable.create(standard).optional(),
      cargaHoraria: EstagioFields.cargaHoraria.create(standard),
      dataInicio: z.preprocess(
        (v) => (v === "" ? null : v),
        EstagioFields.dataInicio.create(standard).nullable().optional(),
      ),
      dataFim: z.preprocess(
        (v) => (v === "" ? null : v),
        EstagioFields.dataFim.create(standard).nullable().optional(),
      ),
      status: EstagioFields.status.create(standard).optional(),
      nomeSupervisor: z.preprocess(
        (v) => (v === "" ? null : v),
        EstagioFields.nomeSupervisor.create(standard).nullable().optional(),
      ),
      emailSupervisor: z.preprocess(
        (v) => (v === "" ? null : v),
        EstagioFields.emailSupervisor.create(standard).nullable().optional(),
      ),
      CursoReferencia: EstagioCursoRefSchema.create(standard).optional(),
      telefoneSupervisor: z.preprocess(
        (v) => (v === "" ? null : v),
        EstagioFields.telefoneSupervisor.create(standard).nullable().optional(),
      ),
      aditivo: EstagioFields.aditivo.create(standard).optional(),
      tipoAditivo: z.preprocess(
        (v) => (v === "" ? null : v),
        EstagioFields.tipoAditivo.create(standard).nullable().optional(),
      ),
      horariosEstagio: z.preprocess(
        (v) => (v === "" ? null : v),
        z.array(HorarioEstagioInputSchema).nullable().optional(),
      ),
      // Campos adicionais do CSV
      dataPrevistaFim: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().date().nullable().optional(),
      ),
      nomeSeguradora: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().max(255).nullable().optional(),
      ),
      numeroApoliceSeguro: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().max(100).nullable().optional(),
      ),
      visitasRealizadas: z.preprocess(
        (v) => (v === null || v === undefined || v === "" ? null : v),
        z.number().int().min(0).nullable().optional(),
      ),
      visitasJustificadas: z.preprocess(
        (v) => (v === null || v === undefined || v === "" ? null : v),
        z.number().int().min(0).nullable().optional(),
      ),
      visitasAVencer: z.preprocess(
        (v) => (v === null || v === undefined || v === "" ? null : v),
        z.number().int().min(0).nullable().optional(),
      ),
      visitasNaoRealizadas: z.preprocess(
        (v) => (v === null || v === undefined || v === "" ? null : v),
        z.number().int().min(0).nullable().optional(),
      ),
      resumoPendencias: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().max(1000).nullable().optional(),
      ),
      encerramentoPor: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().max(255).nullable().optional(),
      ),
      motivacaoDesligamento: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().max(1000).nullable().optional(),
      ),
      motivoRescisao: z.preprocess(
        (v) => (v === "" ? null : v),
        z.string().max(1000).nullable().optional(),
      ),
      mediaNotasSupervisor: z.preprocess(
        (v) => (v === null || v === undefined || v === "" ? null : v),
        z.number().min(0).max(10).nullable().optional(),
      ),
      foiOuSeraContratado: z.preprocess(
        (v) => (v === null || v === undefined || v === "" ? null : v),
        z.boolean().nullable().optional(),
      ),
    })
    .superRefine((data, ctx) => {
      const status = data.status ?? "EM_FASE_INICIAL";

      if (data.dataInicio && data.dataFim) {
        if (new Date(data.dataFim) < new Date(data.dataInicio)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "data de fim deve ser maior ou igual à data de início",
            path: ["dataFim"],
          });
        }
      }

      if (status === "EM_ANDAMENTO" || status === "ENCERRADO") {
        if (!data.estagiario) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "estagiário é obrigatório quando o estágio está em andamento ou encerrado",
            path: ["estagiario"],
          });
        }
        if (!data.dataInicio) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "data de início é obrigatória neste status",
            path: ["dataInicio"],
          });
        }
      }

      if (status === "ENCERRADO") {
        if (!data.dataFim) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "data de fim é obrigatória para estágio encerrado",
            path: ["dataFim"],
          });
        }
      }
    }),
);

export const EstagioUpdateSchema = createSchema((standard) =>
  z.object({
    campus: z.preprocess((v: any) => {
      if (v === null || v === undefined) return undefined;
      if (typeof v === "object" && v !== null && (v.id === "" || v.id == null)) return undefined;
      return v;
    }, ObjectIdUuidFactory.create(standard).optional()),
    empresa: z
      .preprocess(
        (v) => (typeof v === "string" ? { id: v } : v),
        EstagioEmpresaRefSchema.create(standard),
      )
      .optional(),
    estagiario: ObjectIdUuidFactoryNullable.create(standard).optional(),
    usuarioOrientador: ObjectIdUuidFactoryNullable.create(standard).optional(),
    CursoReferencia: EstagioCursoRefSchema.create(standard).optional(),
    cargaHoraria: EstagioFields.cargaHoraria.create(standard).optional(),
    dataInicio: z.preprocess(
      (v) => (v === "" ? null : v),
      EstagioFields.dataInicio.create(standard).nullable().optional(),
    ),
    dataFim: z.preprocess(
      (v) => (v === "" ? null : v),
      EstagioFields.dataFim.create(standard).nullable().optional(),
    ),
    status: EstagioFields.status.create(standard).optional(),
    nomeSupervisor: z.preprocess(
      (v) => (v === "" ? null : v),
      EstagioFields.nomeSupervisor.create(standard).nullable().optional(),
    ),
    emailSupervisor: z.preprocess(
      (v) => (v === "" ? null : v),
      EstagioFields.emailSupervisor.create(standard).nullable().optional(),
    ),
    telefoneSupervisor: z.preprocess(
      (v) => (v === "" ? null : v),
      EstagioFields.telefoneSupervisor.create(standard).nullable().optional(),
    ),
    aditivo: EstagioFields.aditivo.create(standard).optional(),
    tipoAditivo: z.preprocess(
      (v) => (v === "" ? null : v),
      EstagioFields.tipoAditivo.create(standard).nullable().optional(),
    ),
    horariosEstagio: z.preprocess(
      (v) => (v === "" ? null : v),
      z.array(HorarioEstagioInputSchema).nullable().optional(),
    ),
    // Campos adicionais do CSV
    dataPrevistaFim: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().date().nullable().optional(),
    ),
    nomeSeguradora: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().max(255).nullable().optional(),
    ),
    numeroApoliceSeguro: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().max(100).nullable().optional(),
    ),
    visitasRealizadas: z.preprocess(
      (v) => (v === null || v === undefined || v === "" ? null : v),
      z.number().int().min(0).nullable().optional(),
    ),
    visitasJustificadas: z.preprocess(
      (v) => (v === null || v === undefined || v === "" ? null : v),
      z.number().int().min(0).nullable().optional(),
    ),
    visitasAVencer: z.preprocess(
      (v) => (v === null || v === undefined || v === "" ? null : v),
      z.number().int().min(0).nullable().optional(),
    ),
    visitasNaoRealizadas: z.preprocess(
      (v) => (v === null || v === undefined || v === "" ? null : v),
      z.number().int().min(0).nullable().optional(),
    ),
    resumoPendencias: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().max(1000).nullable().optional(),
    ),
    encerramentoPor: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().max(255).nullable().optional(),
    ),
    motivacaoDesligamento: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().max(1000).nullable().optional(),
    ),
    motivoRescisao: z.preprocess(
      (v) => (v === "" ? null : v),
      z.string().max(1000).nullable().optional(),
    ),
    mediaNotasSupervisor: z.preprocess(
      (v) => (v === null || v === undefined || v === "" ? null : v),
      z.number().min(0).max(10).nullable().optional(),
    ),
    foiOuSeraContratado: z.preprocess(
      (v) => (v === null || v === undefined || v === "" ? null : v),
      z.boolean().nullable().optional(),
    ),
  }),
);
