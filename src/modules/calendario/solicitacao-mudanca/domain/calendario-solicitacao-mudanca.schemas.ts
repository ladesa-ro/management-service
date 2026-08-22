import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioSolicitacaoMudancaFields } from "./calendario-solicitacao-mudanca.fields";

export const CalendarioSolicitacaoMudancaSchema = z
  .object({
    id: uuidSchema,
    autor: ObjectIdUuidFactory.domain,
    calendarioAgendamentoId:
      CalendarioSolicitacaoMudancaFields.calendarioAgendamentoId.domainSchema,
    tipoOperacao: CalendarioSolicitacaoMudancaFields.tipoOperacao.domainSchema,
    dadosPropostos: CalendarioSolicitacaoMudancaFields.dadosPropostos.domainSchema,
    justificativa: CalendarioSolicitacaoMudancaFields.justificativa.domainSchema,
    status: CalendarioSolicitacaoMudancaFields.status.domainSchema,
    motivoRecusa: CalendarioSolicitacaoMudancaFields.motivoRecusa.domainSchema,
    sessaoEdicaoId: CalendarioSolicitacaoMudancaFields.sessaoEdicaoId.domainSchema,
  })
  .extend(datedSchema.shape);

export const CalendarioSolicitacaoMudancaCreateSchema = createSchema((standard) =>
  z.object({
    autor: ObjectIdUuidFactory.create(standard).optional(),
    calendarioAgendamentoId:
      CalendarioSolicitacaoMudancaFields.calendarioAgendamentoId.create(standard),
    tipoOperacao: CalendarioSolicitacaoMudancaFields.tipoOperacao.create(standard),
    dadosPropostos: CalendarioSolicitacaoMudancaFields.dadosPropostos.create(standard),
    justificativa: CalendarioSolicitacaoMudancaFields.justificativa.create(standard),
  }),
);

export const CalendarioSolicitacaoMudancaRecusarSchema = createSchema((standard) =>
  z.object({
    motivoRecusa: CalendarioSolicitacaoMudancaFields.motivoRecusa.create(standard).optional(),
  }),
);
