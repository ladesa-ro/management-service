export type RequestRepresentationEntity = {
  ip: string;
  ips: string[];

  protocol: string;
  hostname: string;

  method: string;

  path: string;
  params: Record<string, any>;

  headers: Record<string, any>;

  query: Record<string, any>;
  body: Record<string, any>;
};
