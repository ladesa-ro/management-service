/**
 * Usuario — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const UsuarioFields = {
  nome: createFieldMetadata({
    description: "Nome do usuario",
    schema: z.string().min(1, "nome deve ter pelo menos 1 caractere").nullable().optional(),
    nullable: true,
  }),
  matricula: createFieldMetadata({
    description: "Matrícula do usuário",
    schema: z.string().min(1, "matrícula deve ter pelo menos 1 caractere").nullable().optional(),
    nullable: true,
  }),
  email: createFieldMetadata({
    description: "E-mail do usuario",
    schema: z.string().email("email inválido").nullable().optional(),
    nullable: true,
  }),
  isSuperUser: createFieldMetadata({
    description: "Diz que o usuario tem poderes de administrador",
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa do usuario",
    nullable: true,
  }),
  imagemPerfil: createFieldMetadata({
    description: "Imagem de perfil do usuario",
    nullable: true,
  }),
};
