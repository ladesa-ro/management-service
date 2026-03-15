import { IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class NivelFormacaoFieldsMixin {
  @IsString()
  @MinLength(1)
  slug: string;
}
