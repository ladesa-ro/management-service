
export type PapelEfetivo = "EDITOR" | "LEITOR" | "OCUPACAO" | null;

export interface IAcessoParaResolucao {
  escopo: "USUARIO" | "CAMPUS" | "PUBLICO";
  papel: "OCUPACAO" | "LEITOR" | "EDITOR";
  usuarioId: string | null;
  campusId: string | null;
}

export interface IResolverPapelEfetivoParams {
  colecaoDonoId: string;
  acessos: IAcessoParaResolucao[];
  usuarioId: string;
  isSuperUser: boolean;
  camposAtivosDoUsuario: string[];
}

const RANKING_PAPEL: Record<Exclude<PapelEfetivo, null>, number> = {
  EDITOR: 3,
  LEITOR: 2,
  OCUPACAO: 1,
};

function maisPermissivo(a: PapelEfetivo, b: PapelEfetivo): PapelEfetivo {
  if (a === null) return b;
  if (b === null) return a;
  return RANKING_PAPEL[a] >= RANKING_PAPEL[b] ? a : b;
}

export function resolverPapelEfetivo(params: IResolverPapelEfetivoParams): PapelEfetivo {
  const { colecaoDonoId, acessos, usuarioId, isSuperUser, camposAtivosDoUsuario } = params;

  if (isSuperUser) return "EDITOR";

  let resultado: PapelEfetivo = null;

  if (usuarioId === colecaoDonoId) {
    resultado = maisPermissivo(resultado, "EDITOR");
  }

  for (const acesso of acessos) {
    let candidato: PapelEfetivo = null;

    if (acesso.escopo === "USUARIO" && acesso.usuarioId === usuarioId) {
      candidato = acesso.papel;
    } else if (
      acesso.escopo === "CAMPUS" &&
      acesso.campusId !== null &&
      camposAtivosDoUsuario.includes(acesso.campusId)
    ) {
      candidato = acesso.papel;
    } else if (acesso.escopo === "PUBLICO") {
      candidato = acesso.papel;
    }

    resultado = maisPermissivo(resultado, candidato);
  }

  return resultado;
}
