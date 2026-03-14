import { IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class BlocoFieldsMixin {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsString()
  @MinLength(1)
  codigo: string;
}
