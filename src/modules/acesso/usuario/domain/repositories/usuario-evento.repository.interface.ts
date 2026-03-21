export const IUsuarioEventoRepository = Symbol("IUsuarioEventoRepository");

export interface IUsuarioEventoItem {
  id: string;
  nome: string | null;
  tipo: string;
  dataInicio: string;
  dataFim: string | null;
  diaInteiro: boolean;
  horarioInicio: string;
  horarioFim: string;
  cor: string | null;
  repeticao: string | null;
  status: string | null;
}

export interface IUsuarioEventoCreateInput {
  nome: string;
  tipo?: string;
  dataInicio: string;
  dataFim?: string;
  diaInteiro: boolean;
  horarioInicio?: string;
  horarioFim?: string;
  cor?: string;
  repeticao?: string;
}

export interface IUsuarioEventoUpdateInput {
  nome?: string;
  dataInicio?: string;
  dataFim?: string;
  diaInteiro?: boolean;
  horarioInicio?: string;
  horarioFim?: string;
  cor?: string;
  repeticao?: string;
}

export interface IUsuarioEventoRepository {
  /**
   * Finds all perfil IDs for a given usuario.
   */
  findPerfilIdsByUsuario(usuarioId: string): Promise<string[]>;

  /**
   * Finds a single perfil ID for a given usuario.
   */
  findPerfilIdByUsuario(usuarioId: string): Promise<string | null>;

  /**
   * Lists all active eventos/agendamentos for the given perfil IDs.
   */
  findEventosByPerfilIds(perfilIds: string[]): Promise<IUsuarioEventoItem[]>;

  /**
   * Creates a new evento/agendamento and links it to the given perfil.
   */
  createEvento(
    perfilId: string | null,
    input: IUsuarioEventoCreateInput,
  ): Promise<IUsuarioEventoItem>;

  /**
   * Updates an existing evento/agendamento by ID.
   */
  updateEvento(
    eventoId: string,
    input: IUsuarioEventoUpdateInput,
  ): Promise<IUsuarioEventoItem | null>;

  /**
   * Deletes junction entries linking an evento to the given usuario's perfis.
   */
  deleteEventoForUsuario(usuarioId: string, eventoId: string): Promise<void>;
}
