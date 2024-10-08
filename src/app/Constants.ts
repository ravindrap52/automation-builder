import { Edge, Node } from "@xyflow/react";

import { SidebarItems } from "@/lib/types";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
    type: "default"
  },
  { 
    id: "3",
    position: { x: 200, y: 100 },
    data: { label: "Node 3" },
    type: "output",
  },
];

export const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

export const sidebarNavItems: SidebarItems = [
  {
    id: 1,
    name: 'Input Node',
    nodeType: "input",
    className: "input"
  },
  {
    id: 2,
    name: 'Default Node',
    nodeType: "default",
  },
  {
    id: 3,
    name: 'Output Node',
    nodeType: "output",
    className: "output"
  }
]