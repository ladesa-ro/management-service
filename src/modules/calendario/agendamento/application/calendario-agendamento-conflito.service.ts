import { BadRequestException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilFindAllActiveQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-all-active.query.handler.interface";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { ICalendarioAgendamentoRepository } from "../domain/repositories/calendario-agendamento.repository.interface";

interface IPerfilConflitoInfo {
  usuarioNome: string | null;
  campusNome: string | null;
}

interface IExpansaoPerfis {
  perfilIdsExpandidos: string[];
  infoPorPerfilId: Map<string, IPerfilConflitoInfo>;
}

@Impl()
export class CalendarioAgendamentoConflitoService {
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(IPerfilFindOneQueryHandler)
    private readonly perfilFindOneHandler: IPerfilFindOneQueryHandler,
    @Dep(IPerfilFindAllActiveQueryHandler)
    private readonly perfilFindAllActiveHandler: IPerfilFindAllActiveQueryHandler,
  ) {}

  async ensureSemConflito(
    accessContext: IAccessContext | null,
    params: {
      dataInicio: string;
      dataFim: string | null;
      horarioInicio: string;
      horarioFim: string;
      turmaIds: string[];
      perfilIds: string[];
      ambienteIds: string[];
      excludeIdentificadorExterno?: string;
    },
  ): Promise<void> {
    if (
      params.turmaIds.length === 0 &&
      params.perfilIds.length === 0 &&
      params.ambienteIds.length === 0
    ) {
      return;
    }

    const perfilIdsOriginais = new Set(params.perfilIds);
    const { perfilIdsExpandidos, infoPorPerfilId } = await this.expandirPerfisPorUsuario(
      accessContext,
      params.perfilIds,
    );

    const conflicts = await this.repository.findConflicting({
      ...params,
      perfilIds: perfilIdsExpandidos,
    });

    if (conflicts.length === 0) return;

    const descricoes = conflicts.map((c) => {
      if (c.recurso === "perfil" && !perfilIdsOriginais.has(c.recursoId)) {
        return this.descreverConflitoEntreCampi(
          c.identificadorExterno,
          infoPorPerfilId.get(c.recursoId),
        );
      }
      return `${c.recurso} (${c.recursoId}) no agendamento ${c.identificadorExterno}`;
    });

    throw new BadRequestException(
      `Conflito de horário detectado. Os seguintes recursos já possuem agendamento no mesmo período: ${descricoes.join("; ")}.`,
    );
  }

  private descreverConflitoEntreCampi(
    identificadorExterno: string,
    info: IPerfilConflitoInfo | undefined,
  ): string {
    const quem = info?.usuarioNome ?? "O professor";
    const campusTrecho = info?.campusNome ? ` (${info.campusNome})` : "";
    return `${quem} já tem agendamento neste horário em outro campus${campusTrecho}, no agendamento ${identificadorExterno}`;
  }

  private async expandirPerfisPorUsuario(
    accessContext: IAccessContext | null,
    perfilIds: string[],
  ): Promise<IExpansaoPerfis> {
    if (perfilIds.length === 0) {
      return { perfilIdsExpandidos: [], infoPorPerfilId: new Map() };
    }

    const infoPorPerfilId = new Map<string, IPerfilConflitoInfo>();
    const usuarioIds = new Set<string>();

    const perfis = await Promise.all(
      perfilIds.map((id) => this.perfilFindOneHandler.execute(accessContext, { id })),
    );

    for (const perfil of perfis) {
      if (!perfil?.usuario?.id) continue;
      usuarioIds.add(perfil.usuario.id);
      infoPorPerfilId.set(perfil.id, {
        usuarioNome: perfil.usuario.nome,
        campusNome: perfil.campus?.nomeFantasia ?? null,
      });
    }

    const perfilIdsExpandidos = new Set(perfilIds);

    const perfisPorUsuario = await Promise.all(
      Array.from(usuarioIds).map((usuarioId) =>
        this.perfilFindAllActiveHandler.execute(accessContext, { usuarioId }),
      ),
    );

    for (const perfisDoUsuario of perfisPorUsuario) {
      for (const perfil of perfisDoUsuario) {
        perfilIdsExpandidos.add(perfil.id);
        if (!infoPorPerfilId.has(perfil.id)) {
          infoPorPerfilId.set(perfil.id, {
            usuarioNome: perfil.usuario?.nome ?? null,
            campusNome: perfil.campus?.nomeFantasia ?? null,
          });
        }
      }
    }

    return { perfilIdsExpandidos: Array.from(perfilIdsExpandidos), infoPorPerfilId };
  }
}
