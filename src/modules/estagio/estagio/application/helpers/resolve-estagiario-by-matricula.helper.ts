import type { IAccessContext } from "@/domain/abstractions";
import type { IUsuarioRepository } from "@/modules/acesso/usuario";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario";

/**
 * Resolve o ID de um estagiário a partir de uma matrícula.
 * Tenta localizar através do usuário associado à matrícula e, se não encontrar,
 * tenta localizar pelo perfil do usuário.
 *
 * @param matricula - A matrícula do estagiário a localizar
 * @param usuarioRepository - Repositório de usuários
 * @param estagiarioRepository - Repositório de estagiários
 * @param accessContext - Contexto de acesso da requisição
 * @returns O ID do estagiário ou null se não encontrado
 * @throws Erros de repositório se ocorrerem falhas de acesso ao banco
 */
export async function resolveEstagiarioIdByMatricula(
  matricula: string,
  usuarioRepository: IUsuarioRepository,
  estagiarioRepository: IEstagiarioRepository,
  accessContext: IAccessContext,
): Promise<string | null> {
  if (!matricula) {
    return null;
  }

  try {
    // Busca o usuário pela matrícula
    const usuario = await usuarioRepository.findByMatricula(matricula);

    if (!usuario?.id) {
      return null;
    }

    // Tenta localizar estagiário pelo usuário
    try {
      const estagiarioPorUsuario = await estagiarioRepository.findByUsuarioId(usuario.id);

      if (estagiarioPorUsuario?.id) {
        console.log("[resolveEstagiarioIdByMatricula] ✓ estagiário encontrado por usuário", {
          matricula,
          usuarioId: usuario.id,
          estagiarioId: estagiarioPorUsuario.id,
        });
        return estagiarioPorUsuario.id;
      }
    } catch (error) {
      if (process.env.DEBUG_CSV_IMPORT) {
        console.log("[resolveEstagiarioIdByMatricula] falha ao localizar estagiário por usuário", {
          matricula,
          usuarioId: usuario.id,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Fallback: tenta localizar estagiário pelo perfil do usuário
    try {
      const usuarioFull = await usuarioRepository.getFindOneQueryResult(accessContext, {
        id: usuario.id,
      } as any);

      const vinculos = (usuarioFull?.vinculos as any[]) || [];
      const perfilAluno =
        vinculos.find((v) => v.cargo?.nome?.toLowerCase() === "aluno") ??
        (vinculos[0] || { id: undefined });

      if (perfilAluno?.id) {
        const estagiarioPorPerfil = await estagiarioRepository.findByPerfilId(perfilAluno.id);

        if (estagiarioPorPerfil?.id) {
          console.log("[resolveEstagiarioIdByMatricula] ✓ estagiário encontrado por perfil", {
            matricula,
            perfilId: perfilAluno.id,
            estagiarioId: estagiarioPorPerfil.id,
          });
          return estagiarioPorPerfil.id;
        }
      }
    } catch (error) {
      if (process.env.DEBUG_CSV_IMPORT) {
        console.log("[resolveEstagiarioIdByMatricula] falha ao localizar estagiário por perfil", {
          matricula,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    console.log("[resolveEstagiarioIdByMatricula] ✗ nenhum estagiário encontrado", {
      matricula,
      usuarioId: usuario.id,
    });
    return null;
  } catch (error) {
    if (process.env.DEBUG_CSV_IMPORT) {
      console.log("[resolveEstagiarioIdByMatricula] erro geral ao resolver estagiário", {
        matricula,
        error: error instanceof Error ? error.message : String(error),
      });
    }
    throw error;
  }
}
