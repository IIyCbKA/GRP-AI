export const getUrlWithParam: (baseURL: string, param: string) => string = (
  baseURL: string,
  param: string,
): string => {
  return `${baseURL}${param}/`;
};
