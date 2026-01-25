import { Estado } from "../../estado/domain/estado.domain";

export class Cidade {
  id!: number;
  nome!: string;
  estado!: Estado;
}
