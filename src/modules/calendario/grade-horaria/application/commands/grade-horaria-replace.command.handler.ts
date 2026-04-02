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

    const currentGrades = await this.repository.findAllActiveByCampusId(command.campusId);
    const today = getNowISO().split("T")[0];

    // Mapear grades atuais por identificadorExterno para deteccao de versao
    const currentByExtId = new Map<string, GradeHoraria>();
    for (const grade of currentGrades) {
      currentByExtId.set(grade.identificadorExterno, grade);
    }

    // Conjunto de identificadoresExternos presentes no input
    const inputExtIds = new Set<string>();

    for (const gradeInput of command.gradesHorarias) {
      inputExtIds.add(gradeInput.identificadorExterno);
      const existing = currentByExtId.get(gradeInput.identificadorExterno);

      if (existing) {
        // Grade existente — encerrar versao anterior e criar nova versao
        existing.deactivate();
        await this.repository.saveConfig(existing);

        const newVersion = GradeHoraria.createNewVersion(existing, {
          nome: gradeInput.nome,
          dataInicio: today,
          intervalos: gradeInput.intervalos,
        });
        await this.repository.saveNew(newVersion);
      } else {
        // Nova grade — criar versao 1
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
    }

    // Grades que nao estao no input — encerrar sem nova versao
    for (const [extId, grade] of currentByExtId) {
      if (!inputExtIds.has(extId)) {
        grade.deactivate();
        await this.repository.saveConfig(grade);
      }
    }

    return this.repository.getFindByCampusQueryResult(accessContext, {
      campusId: command.campusId,
    });
  }
}
