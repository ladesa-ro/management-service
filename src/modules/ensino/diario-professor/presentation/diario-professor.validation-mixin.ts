import { IsBoolean } from "@/modules/@shared/presentation/shared";
export class DiarioProfessorFieldsMixin {
  @IsBoolean()
  situacao: boolean;
}
