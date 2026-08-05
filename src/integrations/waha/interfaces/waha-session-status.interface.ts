/**
 * Estados possíveis de uma sessão no WAHA.
 * @see https://waha.devlike.pro/docs/overview/sessions/
 */
export type WahaSessionState = "STOPPED" | "STARTING" | "SCAN_QR_CODE" | "WORKING" | "FAILED";

export interface WahaSessionStatus {
  name: string;
  status: WahaSessionState;
  engine?: {
    name?: string;
    version?: string;
  };
  // QR code base64 retornado quando status === "SCAN_QR_CODE"
  qrCode?: string;
  // Campos adicionais podem existir dependendo do engine
  [key: string]: unknown;
}
