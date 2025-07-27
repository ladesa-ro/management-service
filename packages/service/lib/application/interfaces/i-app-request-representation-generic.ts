export type IAppRequestRepresentationGeneric = {
  method: string;
  path: string;

  headers: {
    [key: string]: string | string[];
  };

  query?:
    | {
        [key: string]: string | string[];
      }
    | string;

  body?: any;

  params?: {
    [key: string]: string;
  };
};
