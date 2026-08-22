export const IQueueOptions = Symbol("IQueueOptions");

export interface IQueueOptions {
  url: string;
  schema: string;
  queueTimetableGenerate: string;
  queueFolhaPontoWhatsapp: string;
}
