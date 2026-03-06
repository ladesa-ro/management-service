import { type Estado } from "@/Ladesa.Management.Domain/Entities/Estado";

export interface EstadoCreateDto {
  /** Código IBGE do estado */
  id: Estado["id"];

  /** Nome oficial do estado */
  nome: string;

  /** Sigla do estado (2 letras maiúsculas) */
  sigla: string;
}
