import { IsDate, IsOptional } from "class-validator";

/**
 * Campos de data comuns para outputs
 */
export class DatedOutput {
  @IsDate()
  dateCreated!: Date;

  @IsDate()
  dateUpdated!: Date;

  @IsOptional()
  @IsDate()
  dateDeleted!: Date | null;
}
