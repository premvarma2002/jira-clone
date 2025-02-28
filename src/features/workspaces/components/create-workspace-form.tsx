"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace(); 
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
   mutate({ json: values});
  };

  return  ( 
  <Card className="w-full h-full border-none shadow-none">
  <CardHeader className="flex p-7">
    <CardTitle className="text-xl font-bold">
      Create a new workspace
    </CardTitle>
  </CardHeader>
  <div className="px-7">
   <DottedSeparator/>
  </div>
  <CardContent className="p-7">
  <Form{...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-y-4">
     <FormField 
     control={form.control}
     name="name"
     render={({ field }) => (
      <FormItem>
        <FormLabel>
          Workspace Name
        </FormLabel>
        <FormControl>
          <Input
          {...field}
           placeholder="Enter Workspace name"
          />
        </FormControl>
        <FormMessage/>
      </FormItem>
     )}
     />
     <DottedSeparator className="py-7"/>
     <div className="flex items-center justify-between">
      <Button
        type="button"
        size="lg"
        variant="secondary"
        onClick={onCancel}
        disabled={isPending}
        
      >
        Cancel
      </Button>
      <Button
        disabled={isPending}
        type="submit"
        size="lg"      >
        Create Workspace
      </Button>
     </div>
     </div>
    </form>
  </Form>
  </CardContent>
  </Card>
  );
};
