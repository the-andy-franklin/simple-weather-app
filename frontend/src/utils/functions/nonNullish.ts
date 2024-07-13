import { NonNullish } from "../types/NonNullish";

export const nonNullish = <T>(value: T): value is NonNullish<T> => value != null;
