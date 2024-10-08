import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useToast } from "../hooks/use-toast";

import { saveNodesorEdges } from "@/lib/apiService";

import ModalDialog from "@/app/components/common/ModalDialog";

jest.mock("@xyflow/react", () => ({
  useUpdateNodeInternals: jest.fn(() => jest.fn()),
}));

jest.mock("../hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

jest.mock("../lib/apiService", () => ({
  saveNodesorEdges: jest.fn(),
}));

const mockNode = {
  id: "1",
  position: { x: 0, y: 0 },
  data: { label: "Node 1" },
  type: "input",
};

const mockUpdateNodeData = jest.fn();

const mockSuccessResponse = {
  success: true,
  message: "Node updated successfully",
};


describe("Modal Dialog", () => {
  const { toast } = useToast();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast });
    (saveNodesorEdges as jest.Mock).mockResolvedValue(mockSuccessResponse);
  });
  it("render the dialog", () => {
    render(<ModalDialog node={mockNode} updateNodeData={mockUpdateNodeData} />);

    expect(
      screen.getByText(/Change the name of the Node/i)
    ).toBeInTheDocument();

    const input = screen.getByLabelText(/Node Name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Node 1");

    expect(
      screen.getByRole("button", { name: /Update Name/i })
    ).toBeInTheDocument();
  });
  it("submits the form and updates the node name", async () => {
    render(<ModalDialog node={mockNode} updateNodeData={mockUpdateNodeData} />);

    expect(screen.getByText("Node")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Node Name/i), {
      target: { value: "Node 1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Name/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        variant: "default",
        title: "Status",
        description: mockSuccessResponse.message,
      });
    });

    expect(mockUpdateNodeData).toHaveBeenCalledWith(mockNode);

    expect(saveNodesorEdges).toHaveBeenCalledWith(mockNode);
  });
});
