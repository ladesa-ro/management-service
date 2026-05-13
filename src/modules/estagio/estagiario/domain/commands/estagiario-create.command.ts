import type { ObjectUuidRef } from "@/domain/abstractions";
import { EstagiarioFields } from "../estagiario.fields";

export const EstagiarioCreateCommandFields = {
  ...EstagiarioFields,
};

export class EstagiarioCreateCommand {
  perfil!: ObjectUuidRef;
  curso!: ObjectUuidRef;
  periodo!: string;
  telefone!: string;
  emailInstitucional!: string;
  dataNascimento!: string;
}
