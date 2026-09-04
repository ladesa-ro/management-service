import { BadRequestException } from "@nestjs/common";
import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEmpresaCreateCommandHandler, IEmpresaRepository } from "@/modules/estagio/empresa";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import {
  type EstagioSolicitarCommand,
  IEstagioCreateCommandHandler,
  IEstagioSolicitarCommandHandler,
} from "@/modules/estagio/estagio/domain/commands";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries";

@Impl()
export class EstagioSolicitarCommandHandlerImpl implements IEstagioSolicitarCommandHandler {
  constructor(
    @Dep(IEstagioCreateCommandHandler)
    private readonly estagioCreateHandler: IEstagioCreateCommandHandler,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IEmpresaRepository)
    private readonly empresaRepository: IEmpresaRepository,
    @Dep(IEmpresaCreateCommandHandler)
    private readonly empresaCreateHandler: IEmpresaCreateCommandHandler,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitarCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado para solicitar um estágio.");
    }

    // 1. Localiza o estagiário vinculado ao usuário autenticado
    let estagiario = await this.estagiarioRepository.findByUsuarioId(userId);

    const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, userId);

    if (!estagiario && perfis.length > 0) {
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario) {
      throw new ForbiddenError("Usuário autenticado não possui perfil de estagiário cadastrado.");
    }

    // 2. Determina o campus do estágio
    let campusId: string | undefined = accessContext?.currentCampusId ?? undefined;

    if (!campusId && perfis.length > 0) {
      const perfilComCampus = perfis.find((p) => p.campus?.id);
      if (perfilComCampus?.campus?.id) {
        campusId = perfilComCampus.campus.id;
      }
    }

    if (!campusId && estagiario.perfil?.id) {
      const perfil = await this.perfilRepository.getFindOneQueryResult(accessContext, {
        id: estagiario.perfil.id,
      });
      if (perfil?.campus?.id) {
        campusId = perfil.campus.id;
      }
    }

    if (!campusId) {
      throw new BadRequestException(
        "Não foi possível determinar o campus do estagiário de forma automática. Selecione um perfil com campus associado.",
      );
    }

    // 3. Busca empresa existente por CNPJ ou cria uma nova empresa
    const empresaExistente = await this.empresaRepository.findByCnpj(dto.cnpj);
    const empresaId = empresaExistente
      ? empresaExistente.id
      : (await this.empresaCreateHandler.execute(accessContext, dto)).id;

    // 4. Cria o estágio vinculado ao estagiário e empresa com status inicial
    const result = await this.estagioCreateHandler.execute(accessContext, {
      campus: { id: campusId },
      empresa: { id: empresaId },
      estagiario: { id: estagiario.id },
      CursoReferencia: estagiario.curso ? { id: estagiario.curso.id } : undefined,
      cargaHoraria: 30,
      status: EstagioStatus.EM_FASE_INICIAL,
      horariosEstagio: [],
    });

    return result;
  }
}
