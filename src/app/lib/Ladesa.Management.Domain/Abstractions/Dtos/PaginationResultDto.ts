import type { IPaginationResult } from "@/Ladesa.Management.Application/@shared/application/pagination";
import { PaginationMetaDto } from "./PaginationMetaDto";

export class PaginationResultDto<T> implements IPaginationResult<T> {
  meta!: PaginationMetaDto;
  data!: T[];
}
