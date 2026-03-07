import { EmpresaFindOneOutputDto } from "./EmpresaFindOneOutputDto";

export class EmpresaListOutputDto {
  data!: EmpresaFindOneOutputDto[];
  total!: number;
  page!: number;
  limit!: number;
}
