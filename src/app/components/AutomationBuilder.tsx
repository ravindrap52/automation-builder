"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Node,
  NodeMouseHandler,
} from "@xyflow/react";

import { v4 as uuidv4 } from "uuid";

import "@xyflow/react/dist/style.css";
import "./styles.css";

import { getNodesAndEdges } from "@/lib/apiService";

import { useDnD } from "@/app/contexts/DnDContext";

import Sidebar from "@/app/components/Sidebar";
import EmailNode from "@/app/components/nodes/EmailNode";
import ModalDialog from "@/app/components/common/ModalDialog";

// Function to generate a unique ID for nodes
const getId = () => `dndnode_${uuidv4()}`;

// list of possible node types
const nodeTypes: NodeTypes = {
  email: EmailNode,
};

const AutomationBuilder = () => {
  const reactFlowWrapper = useRef(null);

  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // current selected node
  const [currentNode, setCurrentNode] = useState<Node | null>(null);

  // we load the data from the server on mount
  useEffect(() => {
    const loadAutomationData = async () => {
      try {
        // api method to get nodes and edges
        const automataionData = await getNodesAndEdges();
        setNodes(automataionData.nodes);
        setEdges(automataionData.edges);
      } catch (error) {
        console.error(error);
      }
    };
    loadAutomationData();
  }, [setNodes, setEdges]);

  // various callbacks
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setCurrentNode(newNode);
      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, type, setNodes]
  );
  
  // Set the clicked node as the current node
  const onNodeClick: NodeMouseHandler<Node> = useCallback(
    (event: React.MouseEvent, node) => {
      setCurrentNode(node);
    },
    []
  );

  // Update node data after changing name
  const updateNodeData = useCallback(
    (updatedNode: Node) => {
      setNodes((nodes) =>
        nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
      );
    },
    [setNodes]
  );

  return (
    <div className="automation-builder">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        {currentNode && (
          <ModalDialog node={currentNode} updateNodeData={updateNodeData} />
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="overview"
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default AutomationBuilder;
