/**
 * Calendario Colecao Acesso — definicao dos campos (FieldMetadata) da entidade.
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const CalendarioColecaoAcessoEscopoValues = ["USUARIO", "CAMPUS", "PUBLICO"] as const;

export const CalendarioColecaoAcessoEscopoSchema = z.enum(CalendarioColecaoAcessoEscopoValues);

export const CalendarioColecaoAcessoPapelValues = ["OCUPACAO", "LEITOR", "EDITOR"] as const;

export const CalendarioColecaoAcessoPapelSchema = z.enum(CalendarioColecaoAcessoPapelValues);

export const CalendarioColecaoAcessoFields = {
  escopo: createFieldMetadata({
    description:
      "Escopo do acesso concedido: USUARIO (perfil específico), CAMPUS (todo perfil ativo no campus) ou PUBLICO (toda a instituição)",
    schema: createSchema(() => CalendarioColecaoAcessoEscopoSchema),
  }),
  usuario: createFieldMetadata({
    description: "Usuário beneficiado pelo acesso. Obrigatório e exclusivo quando escopo é USUARIO",
    nullable: true,
  }),
  campus: createFieldMetadata({
    description: "Campus beneficiado pelo acesso. Obrigatório e exclusivo quando escopo é CAMPUS",
    nullable: true,
  }),
  papel: createFieldMetadata({
    description: "Papel efetivo concedido: OCUPACAO, LEITOR ou EDITOR",
    schema: createSchema(() => CalendarioColecaoAcessoPapelSchema),
  }),
};
