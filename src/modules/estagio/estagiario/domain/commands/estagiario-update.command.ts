import type { ObjectUuidRef } from "@/domain/abstractions";
import { EstagiarioFields } from "../estagiario.fields";

export const EstagiarioUpdateCommandFields = {
  ...EstagiarioFields,
};

export class EstagiarioUpdateCommand {
  perfil?: ObjectUuidRef;
  curso?: ObjectUuidRef;
  periodo?: string;
  telefone?: string;
  emailInstitucional?: string;
  dataNascimento?: string;
}
