import { IsOptional, IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class TurmaFieldsMixin {
  @IsString()
  @MinLength(1)
  periodo: string;

  @IsOptional()
  @IsString()
  nome?: string | null;
}
