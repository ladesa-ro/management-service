import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from "@/modules/@shared/presentation/shared";
export class DiaCalendarioFieldsMixin {
  @IsDateString()
  data: string;

  @IsBoolean()
  diaLetivo: boolean;

  @IsBoolean()
  diaPresencial: boolean;

  @IsOptional()
  @IsString()
  feriado?: string | null;

  @IsString()
  tipo: string;

  @IsBoolean()
  extraCurricular: boolean;
}
