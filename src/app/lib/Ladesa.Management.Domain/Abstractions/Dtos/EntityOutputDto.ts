import type { IdUuid } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import { DatedOutputDto } from "./DatedOutputDto";

export class EntityOutputDto extends DatedOutputDto {
  id!: IdUuid;
}
