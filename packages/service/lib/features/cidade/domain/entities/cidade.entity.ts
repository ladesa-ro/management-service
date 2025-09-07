import { BaseIntIdEntity, ScalarIntId } from "@/shared";
import { Estado } from "@/features/estado";

export type Cidade = BaseIntIdEntity & {
  id: ScalarIntId;

  nome: string;

  estado: Estado
};
