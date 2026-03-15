import { IsString, MinLength } from "@/modules/@shared/presentation/shared";
export class ModalidadeFieldsMixin {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsString()
  @MinLength(1)
  slug: string;
}
