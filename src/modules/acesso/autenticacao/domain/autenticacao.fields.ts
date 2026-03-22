/**
 * Autenticacao — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { createFieldMetadata } from "@/domain/abstractions";

export const AutenticacaoFields = {
  matricula: createFieldMetadata({ description: "Matrícula" }),
  senha: createFieldMetadata({ description: "Senha" }),
  email: createFieldMetadata({ description: "E-mail" }),
  refreshToken: createFieldMetadata({ description: "Token de refresh", nullable: true }),
  usuario: createFieldMetadata({ description: "Usuario autenticado", nullable: true }),
  perfisAtivos: createFieldMetadata({ description: "Vinculos do usuario logado" }),
  accessToken: createFieldMetadata({ description: "Token de acesso", nullable: true }),
  tokenType: createFieldMetadata({ description: "Tipo do token", nullable: true }),
  idToken: createFieldMetadata({ description: "Token de identificacao", nullable: true }),
  expiresIn: createFieldMetadata({ description: "Tempo de expiracao do token", nullable: true }),
  expiresAt: createFieldMetadata({ description: "Tempo de expiracao do token", nullable: true }),
  sessionState: createFieldMetadata({ description: "Estado da sessao", nullable: true }),
  scope: createFieldMetadata({ description: "Escopo da autenticacao", nullable: true }),
};
