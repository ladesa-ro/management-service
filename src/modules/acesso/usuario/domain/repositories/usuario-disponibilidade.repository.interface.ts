export const IUsuarioDisponibilidadeRepository = Symbol("IUsuarioDisponibilidadeRepository");

export interface IUsuarioDisponibilidadeItem {
  id: string;
  dataInicio: string;
  dataFim: string | null;
  diaInteiro: boolean;
  horarioInicio: string;
  horarioFim: string;
  repeticao: string | null;
}

export interface IUsuarioDisponibilidadeSetInput {
  dataInicio: string;
  dataFim?: string;
  diaInteiro: boolean;
  horarioInicio?: string;
  horarioFim?: string;
  repeticao?: string;
}

export interface IUsuarioDisponibilidadeRepository {
  /**
   * Finds perfil IDs for a given usuario, optionally filtered by campus.
   */
  findPerfilIdsByUsuario(usuarioId: string, campusId?: string): Promise<string[]>;

  /**
   * Finds a single perfil ID for a given usuario, optionally filtered by campus.
   */
  findPerfilIdByUsuario(usuarioId: string, campusId?: string): Promise<string | null>;

  /**
   * Lists indisponibilidade entries for the given perfil IDs.
   */
  findIndisponibilidadesByPerfilIds(perfilIds: string[]): Promise<IUsuarioDisponibilidadeItem[]>;

  /**
   * Replaces all indisponibilidade entries for a given perfil (bulk replace).
   */
  replaceIndisponibilidades(
    perfilId: string,
    items: IUsuarioDisponibilidadeSetInput[],
  ): Promise<void>;
}
