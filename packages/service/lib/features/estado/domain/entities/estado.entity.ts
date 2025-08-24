import { BaseIntIdEntity, ScalarIntId } from "@/shared-novo";

export type Estado = BaseIntIdEntity & {
  id: ScalarIntId;

  nome: string;
  sigla: string;
};
