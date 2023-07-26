export type Modify<T, R> = Omit<T, keyof R> & R;

export type ModifyAllType<T, R> = Partial<{
  [Property in keyof T]: R;
}>;
