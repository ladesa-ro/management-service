export interface OpenWASendMessageArgs {
  to: string;
  text: string;
}

export interface OpenWASendMessagePayload {
  args: OpenWASendMessageArgs;
}
