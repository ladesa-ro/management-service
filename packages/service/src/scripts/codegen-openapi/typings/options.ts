export type OptionsFile = {
  outFile: string;
};

export type OptionsBuilder = {
  apiPrefix?: {
    path: string;
    exclude?: string[];
  };
};

export type Options = OptionsFile & OptionsBuilder;
