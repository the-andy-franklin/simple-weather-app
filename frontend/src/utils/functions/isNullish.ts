import { Nullish } from "../types/Nullish";

export const isNullish = (value: unknown): value is Nullish => value == null;
