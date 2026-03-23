export interface IDatabaseCommand {
  execute(): Promise<void>;
}
