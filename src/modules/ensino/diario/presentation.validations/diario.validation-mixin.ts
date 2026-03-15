import { IsBoolean } from "@/modules/@shared/presentation/shared";
export class DiarioFieldsMixin {
  @IsBoolean()
  ativo: boolean;
}
