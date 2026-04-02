import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { getNowISO } from "@/utils/date";
import { IGradeHorariaPermissionChecker } from "../../domain/authorization";
import type { GradeHorariaReplaceCommand } from "../../domain/commands";
import { IGradeHorariaReplaceCommandHandler } from "../../domain/commands";
import { GradeHoraria } from "../../domain/grade-horaria";
import type { GradeHorariaFindByCampusQueryResult } from "../../domain/queries";
import { IGradeHorariaRepository } from "../../domain/repositories";

@Impl()
export class GradeHorariaReplaceCommandHandlerImpl implements IGradeHorariaReplaceCommandHandler {
  constructor(
    @Dep(IGradeHorariaRepository)
    private readonly repository: IGradeHorariaRepository,
    @Dep(IGradeHorariaPermissionChecker)
    private readonly permissionChecker: IGradeHorariaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: GradeHorariaReplaceCommand,
  ): Promise<GradeHorariaFindByCampusQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto: command }, command.campusId);

    // Desativar TODAS as grades ativas do campus (preserva historico)
    const currentGrades = await this.repository.findAllActiveByCampusId(command.campusId);
    for (const grade of currentGrades) {
      grade.deactivate();
      await this.repository.saveConfig(grade);
    }

    // Criar novas grades ativas com os intervalos
    const today = getNowISO().split("T")[0];
    for (const gradeInput of command.gradesHorarias) {
      const newGrade = GradeHoraria.create({
        identificadorExterno: gradeInput.identificadorExterno,
        nome: gradeInput.nome,
        dataInicio: today,
        ativo: true,
        campus: { id: command.campusId },
        intervalos: gradeInput.intervalos,
      });
      await this.repository.saveNew(newGrade);
    }

    return this.repository.getFindByCampusQueryResult(accessContext, {
      campusId: command.campusId,
    });
  }
}
