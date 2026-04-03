import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { BusinessRuleViolationError } from "@/domain/errors";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { CursoCreateCommand } from "@/modules/ensino/curso/domain/commands/curso-create.command";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { ICursoPermissionChecker } from "../../domain/authorization";
import type { CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoPeriodoDisciplinaRepository, ICursoRepository } from "../../domain/repositories";

@Impl()
export class CursoCreateCommandHandlerImpl implements ICursoCreateCommandHandler {
  constructor(
    @Dep(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Dep(ICursoPeriodoDisciplinaRepository)
    private readonly periodoDisciplinaRepository: ICursoPeriodoDisciplinaRepository,
    @Dep(ICursoPermissionChecker)
    private readonly permissionChecker: ICursoPermissionChecker,
    @Dep(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Dep(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CursoCreateCommand,
  ): Promise<CursoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
      id: dto.ofertaFormacao.id,
    });
    ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);

    if (ofertaFormacao.campus.id !== campus.id) {
      throw new BusinessRuleViolationError(
        "OFERTA_FORMACAO_CAMPUS_MATCH",
        "A formação selecionada não pertence ao campus informado.",
      );
    }

    const domain = Curso.create({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      quantidadePeriodos: dto.quantidadePeriodos,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
    });

    const { id } = await this.repository.create({
      ...domain,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
      imagemCapa: domain.imagemCapa ? { id: domain.imagemCapa.id } : null,
    });

    if (dto.periodos) {
      for (const periodoItem of dto.periodos) {
        for (const discItem of periodoItem.disciplinas) {
          await this.periodoDisciplinaRepository.save({
            id: generateUuidV7(),
            curso: { id },
            numeroPeriodo: periodoItem.numeroPeriodo,
            disciplina: { id: discItem.disciplinaId },
            cargaHoraria: discItem.cargaHoraria ?? null,
          });
        }
      }
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(result, Curso.entityName, id);

    return result;
  }
}
