import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";
import ProjectForm from "@/src/components/ProjectForm";
import { toast } from "sonner";

const EditProject: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project } = useQuery({
    queryKey: ["project", id],
    queryFn: () => apiService.getProjectById(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => apiService.updateProject(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects-admin"] });
      toast.success("Project updated!");
      navigate("/admin/projects");
    },
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
      {project && (
        <ProjectForm
          initialData={project.data}
          onSubmit={(formData) => mutation.mutate(formData)}
          isLoading={mutation.isPending}
        />
      )}
    </div>
  );
};

export default EditProject;
