export interface InMemoryFile<T> {
  version: string;
  sequence: number;
  data: T[];
}
