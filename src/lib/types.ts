import { Node } from "@xyflow/react";

// sidebar item
interface SidebarItem {
  id: number;
  name: string;
  nodeType: string;
  className?: string;
}

export type SidebarItems = SidebarItem[];

// modal dialog props
export interface ModalDialogProps {
  node: Node;
  updateNodeData: (updatedNode: Node) => void;
}
