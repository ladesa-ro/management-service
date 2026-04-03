import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext, PersistInput } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { BusinessRuleViolationError } from "@/domain/errors";
import type { CursoUpdateCommand } from "@/modules/ensino/curso/domain/commands/curso-update.command";
import { ICursoUpdateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import type { ICurso } from "@/modules/ensino/curso/domain/curso";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import type { CursoFindOneQuery } from "@/modules/ensino/curso/domain/queries";
import { ICursoPermissionChecker } from "../../domain/authorization";
import type { CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoPeriodoDisciplinaRepository, ICursoRepository } from "../../domain/repositories";

@Impl()
export class CursoUpdateCommandHandlerImpl implements ICursoUpdateCommandHandler {
  constructor(
    @Dep(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Dep(ICursoPeriodoDisciplinaRepository)
    private readonly periodoDisciplinaRepository: ICursoPeriodoDisciplinaRepository,
    @Dep(ICursoPermissionChecker)
    private readonly permissionChecker: ICursoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CursoFindOneQuery & CursoUpdateCommand,
  ): Promise<CursoFindOneQueryResult> {
    const currentDomain = await this.repository.loadById(accessContext, dto.id);

    ensureExists(currentDomain, Curso.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Curso.load(currentDomain);
    domain.update({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      quantidadePeriodos: dto.quantidadePeriodos,
    });
    const updateData: Partial<PersistInput<ICurso>> = { ...domain };

    if (has(dto, "campus") && dto.campus !== undefined) {
      throw new BusinessRuleViolationError(
        "CURSO_CAMPUS_IMMUTABLE",
        "O campus do curso não pode ser alterado após a criação.",
      );
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      throw new BusinessRuleViolationError(
        "CURSO_OFERTA_FORMACAO_IMMUTABLE",
        "A formação do curso não pode ser alterada após a criação.",
      );
    }
    await this.repository.update(currentDomain.id, updateData);

    if (dto.periodos) {
      await this.periodoDisciplinaRepository.deleteByCursoId(dto.id);

      for (const periodoItem of dto.periodos) {
        for (const discItem of periodoItem.disciplinas) {
          await this.periodoDisciplinaRepository.save({
            id: generateUuidV7(),
            curso: { id: dto.id },
            numeroPeriodo: periodoItem.numeroPeriodo,
            disciplina: { id: discItem.disciplinaId },
            cargaHoraria: discItem.cargaHoraria ?? null,
          });
        }
      }
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });

    ensureExists(result, Curso.entityName, dto.id);

    return result;
  }
}
