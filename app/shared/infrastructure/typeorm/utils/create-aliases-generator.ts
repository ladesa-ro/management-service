export const createAliasesGenerator = () => {
  let counter = 0;

  return () => {
    counter++;
    return `rel_${counter}`;
  };
};
