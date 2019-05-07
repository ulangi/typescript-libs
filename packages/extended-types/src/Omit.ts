import { Diff } from "./Diff";

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
