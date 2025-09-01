import { BaseIntIdEntity, ScalarIntId } from "@/shared";

export type Estado = BaseIntIdEntity & {
  id: ScalarIntId;

  nome: string;
  sigla: string;
};
