export type IAppRequestRepresentationGeneric = {
  path: string;
  method: string;

  params: {
    [key: string]: any;
  };

  headers: {
    [key: string]: any | any[];
  };

  query: {
    [key: string]: any | any[];
  };

  body?: any;
};
