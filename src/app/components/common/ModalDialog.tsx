"use client";

import { useEffect, useState } from "react";

import { useUpdateNodeInternals } from "@xyflow/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";

import { nodeFormSchema } from "@/lib/zodSchema";

import { saveNodesorEdges } from "@/lib/apiService";
import { ModalDialogProps } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type nodeForm = z.infer<typeof nodeFormSchema>;

export default function ModalDialog({
  node,
  updateNodeData,
}: ModalDialogProps) {
  // state
  const [isOpen, setIsOpen] = useState(false);
  const updateNodeInternals = useUpdateNodeInternals();
  const { toast } = useToast();

  // registering form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<nodeForm>({
    defaultValues: {
      nodeName: "",
    },
    resolver: zodResolver(nodeFormSchema),
  });

  // setting the node name initial value
  useEffect(() => {
    if (Object.keys(node.data).length > 0) {
      setIsOpen(true);
      reset({ nodeName: node.data.label as string });
    } else {
      setIsOpen(false);
    }
  }, [node, reset]);

  // from submit and updating the name
  const updateName: SubmitHandler<nodeForm> = async (data) => {
    const updatedNode = {
      ...node,
      data: { ...node.data, label: data.nodeName },
    };
    let response = null;
    try {
      response = await saveNodesorEdges(updatedNode);
      if (response.success) {
        toast({
          variant: "default",
          title: "Status",
          description: response.message,
        });
        updateNodeData(updatedNode);
        updateNodeInternals(updatedNode.id);
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Status",
        description: response.message,
      });
      if (error instanceof Error) {
        console.error("Error while updating name:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      if (isOpen) setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form id="hook-form" onSubmit={handleSubmit(updateName)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Node</DialogTitle>
            <DialogDescription>Change the name of the Node</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Node Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("nodeName")}
              />
              {errors.nodeName && (
                <span className="col-span-4 text-red-600 text-center">
                  {errors.nodeName.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" form="hook-form">
              Update Name
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
