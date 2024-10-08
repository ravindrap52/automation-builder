import { NextRequest } from "next/server";

import { Edge, Node } from "@xyflow/react";
import { initialEdges, initialNodes } from "@/app/Constants";

interface ApiResponse {
  nodes: Node[];
  edges: Edge[];
}

export async function GET(): Promise<Response> {
  const responseData: ApiResponse = {
    nodes: initialNodes,
    edges: initialEdges,
  };

  return new Response(JSON.stringify(responseData), {
    status: 200,
  });
}

export async function PUT(request: NextRequest): Promise<Response> {
  const { nodes, edges }: ApiResponse = await request.json();
  return new Response(
    JSON.stringify({
      nodes,
      edges,
    }),
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
try {
    const { nodes, edges }: ApiResponse = await request.json();
    console.log(nodes, edges);
    return Response.json({ success: true, message: "Node updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return Response.json(
      { success: false, message: "Something went wrong.. try again" },
      { status: 400 }
    );
  }
}
