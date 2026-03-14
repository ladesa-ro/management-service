export type IRequestActor = null | {
  id: string;
  nome: string | null;
  matricula: string | null;
  email: string | null;
  isSuperUser: boolean;
};
