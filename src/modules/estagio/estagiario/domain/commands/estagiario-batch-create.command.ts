import { createFieldMetadata, type ObjectUuidRef } from "@/domain/abstractions";
import type { VinculoInput } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { UsuarioCreateCommandFields } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { EstagiarioFields } from "../estagiario.fields";

export const EstagiarioBatchCreateCommandFields = {
  estagiarios: createFieldMetadata({
    description: "Lista de estagiários para cadastro em massa",
  }),
  usuario: createFieldMetadata({
    description: "Dados do usuário que será criado para o estagiário",
  }),
  nome: UsuarioCreateCommandFields.nome,
  matricula: UsuarioCreateCommandFields.matricula,
  email: UsuarioCreateCommandFields.email,
  vinculos: UsuarioCreateCommandFields.vinculos,
  curso: EstagiarioFields.curso,
  turma: EstagiarioFields.turma,
  telefone: EstagiarioFields.telefone,
  emailInstitucional: EstagiarioFields.emailInstitucional,
  dataNascimento: EstagiarioFields.dataNascimento,
};

export class EstagiarioBatchCreateUsuarioInput {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
  vinculos?: VinculoInput[];
}

export class EstagiarioBatchCreateItem {
  usuario!: EstagiarioBatchCreateUsuarioInput;
  curso!: ObjectUuidRef;
  turma!: ObjectUuidRef;
  telefone!: string;
  emailInstitucional!: string;
  dataNascimento!: string;
}

export class EstagiarioBatchCreateCommand {
  estagiarios!: EstagiarioBatchCreateItem[];
}
