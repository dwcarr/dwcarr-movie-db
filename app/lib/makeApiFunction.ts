export const makeApiFunction = <T>(request: Request, fn: () => Promise<T>) => {
  // todo: add permissions handling
  return async () => {
    try {
      const result = await fn();
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };
};

export type ApiReturnType<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
