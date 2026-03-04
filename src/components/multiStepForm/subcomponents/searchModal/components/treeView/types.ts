import type { TreeConfig } from '../../../../types';

export interface TreeViewProps {
  onSelect: (item: Record<string, unknown>) => void;
  results: Record<string, unknown>[];
  config: TreeConfig;
}

export interface TreeNodeProps {
  onSelect: (item: Record<string, unknown>) => void;
  item: Record<string, unknown>;
  config: TreeConfig;
  level?: number;
}