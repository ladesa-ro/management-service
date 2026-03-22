export interface INotificacao {
  id: string;
  titulo: string;
  conteudo: string;
  lida: boolean;
  usuario: { id: string };
  dateCreated: Date;
}
