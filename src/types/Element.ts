
export interface Element {
  id: string;
  name: string;
  emoji: string;
  discovered: boolean;
  description?: string;
  category?: string;
  parents?: string[];
}
