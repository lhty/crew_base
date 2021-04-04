import { Dispatch, useReducer } from "react";

export default function useFormValues<T>(
  initial: T
): [T, Dispatch<Partial<T>>] {
  const [values, setValue] = useReducer<(values: T, updates: Partial<T>) => T>(
    (values, updates) => ({
      ...values,
      ...updates,
    }),
    initial
  );
  return [values, setValue];
}
