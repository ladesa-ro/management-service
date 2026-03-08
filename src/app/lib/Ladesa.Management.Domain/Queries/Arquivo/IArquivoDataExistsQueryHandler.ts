export interface IArquivoDataExistsQueryHandler {
  execute(id: string): Promise<false | "dir" | "file" | "other">;
}
