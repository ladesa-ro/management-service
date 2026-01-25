export class Arquivo {
  id!: string;
  name!: string;
  mimeType!: string;
  sizeBytes!: number;
  storageType!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
