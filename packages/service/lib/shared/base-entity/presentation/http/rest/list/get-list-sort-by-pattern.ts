export const getListSortByPattern = (allowedProperties: string[]) => {
  if (!allowedProperties.length) return "^$";
  const propertyPattern = allowedProperties.join("|");
  return `^(${propertyPattern})(:(ASC|DESC))?$`;
};
