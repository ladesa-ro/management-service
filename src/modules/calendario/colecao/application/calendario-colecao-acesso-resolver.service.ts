import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import {
  type IAcessoParaResolucao,
  type PapelEfetivo,
  resolverPapelEfetivo,
} from "../domain/calendario-colecao-acesso-resolver";
import {
  ICalendarioColecaoAcessoRepository,
  ICalendarioColecaoRepository,
} from "../domain/repositories";

/**
 * Loader do resolvedor de papel efetivo (ACL) — busca os dados necessários
 * (dono da coleção, concessões ativas, perfis ativos do usuário) e delega a
 * decisão para a função pura `resolverPapelEfetivo`.
 *
 * Ainda não é consumido por nenhum permission checker — será injetado no
 * checkpoint em que a autorização de calendario_agendamento passar a ser real.
 */

@Impl()
export class CalendarioColecaoAcessoResolverService {
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly colecaoRepository: ICalendarioColecaoRepository,
    @Dep(ICalendarioColecaoAcessoRepository)
    private readonly acessoRepository: ICalendarioColecaoAcessoRepository,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async resolverPapelEfetivoParaColecao(
    accessContext: IAccessContext | null,
    colecaoId: string,
  ): Promise<PapelEfetivo> {
    const usuarioId = accessContext?.requestActor?.id;
    if (!usuarioId) return null;

    const colecao = await this.colecaoRepository.loadById(accessContext, colecaoId);
    if (!colecao) return null;

    const [acessos, perfisAtivos] = await Promise.all([
      this.acessoRepository.findAllActiveByColecaoId(accessContext, colecaoId),
      this.perfilRepository.findAllActiveByUsuarioId(accessContext, usuarioId),
    ]);

    const acessosParaResolucao: IAcessoParaResolucao[] = acessos.map((acesso) => ({
      escopo: acesso.escopo as IAcessoParaResolucao["escopo"],
      papel: acesso.papel as IAcessoParaResolucao["papel"],
      usuarioId: acesso.usuario?.id ?? null,
      campusId: acesso.campus?.id ?? null,
    }));

    return resolverPapelEfetivo({
      colecaoDonoId: colecao.dono.id,
      acessos: acessosParaResolucao,
      usuarioId,
      isSuperUser: accessContext?.requestActor?.isSuperUser ?? false,
      camposAtivosDoUsuario: perfisAtivos.map((perfil) => perfil.campus.id),
    });
  }
}
