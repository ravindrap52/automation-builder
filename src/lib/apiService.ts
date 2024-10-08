import { Node } from "@xyflow/react";

import { ZodError } from "zod";

import { nodeSchema } from "@/lib/zodSchema";

export const getNodesAndEdges = async () => {
  try {
    const response = await fetch("/api/automation");
    if (!response.ok) {
      throw new Error("Error while fetching data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveNodesorEdges = async (data: Node) => {
  try {
    // Validating the schema
    nodeSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      throw new Error("Invalid data structure");
    }
    console.error("Error during validation:", error);
    throw new Error("Error during validation");
  }
  try {
    const response = await fetch("/api/automation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
