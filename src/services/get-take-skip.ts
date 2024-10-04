interface IResponse {
  take: number;
  skip: number;
}

export const getTakeAndSkip = (limit: number, page: number): IResponse => {
  const offset = (page - 1) * limit;
  return {
    take: limit,
    skip: offset,
  };
};
