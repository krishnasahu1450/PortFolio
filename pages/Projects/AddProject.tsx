import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProjectForm from "@/src/components/ProjectForm";

const AddProject: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => apiService.createProject(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects-admin"] });
      toast.success("Project created successfully!");
      navigate("/admin/projects");
    },
    onError: () => toast.error("Something went wrong"),
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Add Project</h2>
      <ProjectForm
        onSubmit={(formData) => mutation.mutate(formData)}
        isLoading={mutation.isPending}
      />
    </div>
  );
};

export default AddProject;
