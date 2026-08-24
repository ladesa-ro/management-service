import { ForbiddenException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import type { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoVisibilidadeService } from "./calendario-agendamento-visibilidade.service";

interface IColecaoRefPayload {
  colecao?: { id: string } | null;
}

@Impl()
export class CalendarioAgendamentoPermissionCheckerImpl
  implements ICalendarioAgendamentoPermissionChecker
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(CalendarioAgendamentoVisibilidadeService)
    private readonly visibilidadeService: CalendarioAgendamentoVisibilidadeService,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async ensureCanCreate(
    accessContext: IAccessContext | null,
    payload: { dto: IColecaoRefPayload },
  ): Promise<void> {
    const colecaoId = payload.dto.colecao?.id ?? null;

    if (colecaoId === null) return;

    const visibilidade = await this.visibilidadeService.resolver(accessContext, colecaoId);
    this.ensurePodeEditar(visibilidade);
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    payload: { dto: IColecaoRefPayload },
    id: string,
  ): Promise<void> {
    await this.ensureCanEditarExistente(accessContext, payload, id);
  }

  async ensureCanDelete(
    accessContext: IAccessContext | null,
    payload: { dto: IColecaoRefPayload },
    id: string,
  ): Promise<void> {
    await this.ensureCanEditarExistente(accessContext, payload, id);
  }

  async ensureCanCancelarPropria(
    accessContext: IAccessContext | null,
    agendamentoId: string,
  ): Promise<void> {
    const agendamento = await this.repository.loadById(accessContext, agendamentoId);

    if (!agendamento) return;

    const colecaoId = agendamento.colecao?.id ?? null;
    const visibilidade = await this.visibilidadeService.resolver(accessContext, colecaoId);
    if (this.visibilidadeService.podeEditar(visibilidade)) return;

    const usuarioId = accessContext?.requestActor?.id;
    if (usuarioId) {
      const perfisAtivos = await this.perfilRepository.findAllActiveByUsuarioId(
        accessContext,
        usuarioId,
      );
      const perfisAtivosIds = new Set(perfisAtivos.map((perfil) => perfil.id));
      const eParticipante = agendamento.perfis.some((perfil) => perfisAtivosIds.has(perfil.id));

      if (eParticipante) return;
    }

    throw new ForbiddenException(
      "Sem permissão para cancelar esta ocorrência. É preciso ser dono, ter papel EDITOR na coleção, ou ser um dos perfis participantes do agendamento.",
    );
  }

  private async ensureCanEditarExistente(
    accessContext: IAccessContext | null,
    payload: { dto: IColecaoRefPayload },
    id: string,
  ): Promise<void> {
    const agendamento = await this.repository.loadById(accessContext, id);

    if (!agendamento) return;

    const colecaoIdAtual = agendamento.colecao?.id ?? null;

    if (colecaoIdAtual !== null) {
      const visibilidadeAtual = await this.visibilidadeService.resolver(
        accessContext,
        colecaoIdAtual,
      );
      this.ensurePodeEditar(visibilidadeAtual);
    }

    if (payload.dto.colecao !== undefined) {
      const novoColecaoId = payload.dto.colecao?.id ?? null;

      if (novoColecaoId !== null && novoColecaoId !== colecaoIdAtual) {
        const visibilidadeNova = await this.visibilidadeService.resolver(
          accessContext,
          novoColecaoId,
        );
        this.ensurePodeEditar(visibilidadeNova);
      }
    }
  }

  private ensurePodeEditar(
    visibilidade: Awaited<ReturnType<CalendarioAgendamentoVisibilidadeService["resolver"]>>,
  ): void {
    if (!this.visibilidadeService.podeEditar(visibilidade)) {
      throw new ForbiddenException(
        "Sem permissão de edição na coleção deste agendamento. É preciso ser dono ou ter papel EDITOR.",
      );
    }
  }
}
