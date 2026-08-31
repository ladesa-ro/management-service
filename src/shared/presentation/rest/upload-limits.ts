import type { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

/**
 * Limites padronizados de tamanho para uploads multipart/form-data.
 * Previne ataques de DoS por esgotamento de memória (OOM).
 */
export const UPLOAD_LIMITS = {
  /** Imagens de perfil, capa, fotos (máximo 5MB) */
  IMAGE: {
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  } as MulterOptions,

  /** Planilhas CSV / XLS / XLSX para importação de alunos e dados (máximo 10MB) */
  SPREADSHEET: {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  } as MulterOptions,

  /** Documentos PDF (ex: relatórios de estágio) (máximo 20MB) */
  DOCUMENT: {
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  } as MulterOptions,
} as const;
