import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { PerfilService } from "@/Ladesa.Management.Application/acesso/perfil";
import { DiarioService } from "@/Ladesa.Management.Application/ensino/diario/application/use-cases/diario.service";
import { DiarioProfessor } from "@/Ladesa.Management.Application/ensino/diario-professor";
import { type DiarioProfessorCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorCreateInputDto";
import { type DiarioProfessorFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorFindOneInputDto";
import { type DiarioProfessorFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorFindOneOutputDto";
import { type DiarioProfessorListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorListInputDto";
import { type DiarioProfessorListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorListOutputDto";
import { type DiarioProfessorUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorUpdateInputDto";
import { IDiarioProfessorRepository } from "../ports";

@Injectable()
export class DiarioProfessorService extends BaseCrudService<
  DiarioProfessor,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorCreateInputDto,
  DiarioProfessorUpdateInputDto
> {
  protected readonly resourceName = "DiarioProfessor";
  protected readonly createAction = "diario_professor:create";
  protected readonly updateAction = "diario_professor:update";
  protected readonly deleteAction = "diario_professor:delete";

  constructor(
    @Inject(IDiarioProfessorRepository)
    protected readonly repository: IDiarioProfessorRepository,
    private readonly diarioService: DiarioService,
    private readonly perfilService: PerfilService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiarioProfessorCreateInputDto,
  ): Promise<Partial<PersistInput<DiarioProfessor>>> {
    let diarioRef: { id: string } | undefined;
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioService.findByIdStrict(accessContext, { id: dto.diario.id });
      diarioRef = { id: diario.id };
    }

    let perfilRef: { id: string } | undefined;
    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, { id: dto.perfil.id });
      perfilRef = { id: perfil.id };
    }

    const domain = DiarioProfessor.criar({
      situacao: dto.situacao,
      diario: diarioRef!,
      perfil: perfilRef!,
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto,
    current: DiarioProfessorFindOneOutputDto,
  ): Promise<Partial<PersistInput<DiarioProfessor>>> {
    const domain = DiarioProfessor.fromData({
      ...current,
      diarioId: current.diario.id,
      perfilId: current.perfil.id,
    } as unknown as DiarioProfessor);
    domain.atualizar({ situacao: dto.situacao });
    const result: Partial<PersistInput<DiarioProfessor>> = { situacao: domain.situacao };

    if (has(dto, "diario") && dto.diario !== undefined && dto.diario !== null) {
      const diario = await this.diarioService.findByIdStrict(accessContext, { id: dto.diario.id });
      result.diarioId = diario.id;
    }

    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, { id: dto.perfil.id });
      result.perfilId = perfil.id;
    }

    return result;
  }
}
