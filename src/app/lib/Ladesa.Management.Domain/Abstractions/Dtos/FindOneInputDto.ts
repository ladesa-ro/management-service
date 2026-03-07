import type { IdUuid } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class FindOneInputDto {
  id!: IdUuid;
  selection?: string[];
}
