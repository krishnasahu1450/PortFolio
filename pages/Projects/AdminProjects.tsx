// import { PROJECTS } from '../constants';
// import React, { useState } from 'react';
// import { Project } from '../types';

// const AdminProjects: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>(PROJECTS);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);

//   return (
//     <div className="flex flex-col gap-8 h-full">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-3xl font-black tracking-tight text-white mb-1">Projects</h2>
//           <p className="text-text-secondary">Manage and track your portfolio projects</p>
//         </div>
//         <button className="flex items-center justify-center gap-2 bg-primary hover:brightness-110 text-background-dark px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
//           <span className="material-symbols-outlined text-[20px]">add</span>
//           <span>Add Project</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-12 gap-6 lg:gap-8 h-full min-h-0 flex-1">
//         <div className="col-span-12 xl:col-span-7 flex flex-col gap-4 min-h-0">
//           <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
//             <div className="overflow-x-auto flex-1">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-border-dark bg-background-dark/30">
//                     <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Project Title</th>
//                     <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-border-dark">
//                   {projects?.map((project) => (
//                     <tr
//                       key={project?.id}
//                       onClick={() => setSelectedProject(project)}
//                       className={`group hover:bg-background-dark/50 transition-colors cursor-pointer ${selectedProject?.id === project?.id ? 'bg-primary/5' : ''}`}
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <img src={project?.image} className="h-10 w-10 rounded-lg object-cover shrink-0 border border-border-dark" alt={project?.title} />
//                           <div>
//                             <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{project?.title}</p>
//                             <p className="text-xs text-text-secondary">/{project?.slug}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project?.status === 'live' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
//                           {project?.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <button className="p-1.5 rounded-md hover:bg-primary/20 text-primary transition-colors">
//                             <span className="material-symbols-outlined text-[18px]">edit</span>
//                           </button>
//                           <button className="p-1.5 rounded-md hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors">
//                             <span className="material-symbols-outlined text-[18px]">delete</span>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-12 xl:col-span-5 h-full min-h-0">
//           {selectedProject && (
//             <div className="bg-surface-dark border border-border-dark rounded-xl p-6 lg:p-8 flex flex-col gap-6 sticky top-0 animate-in fade-in slide-in-from-right duration-300 overflow-y-auto max-h-full no-scrollbar">
//               <div className="flex items-center justify-between pb-4 border-b border-border-dark">
//                 <h3 className="text-xl font-bold text-white">Edit Project</h3>
//                 <div className="flex gap-2">
//                   <button className="text-text-secondary hover:text-white transition-colors">
//                     <span className="material-symbols-outlined">open_in_new</span>
//                   </button>
//                   <button className="text-text-secondary hover:text-white transition-colors">
//                     <span className="material-symbols-outlined">more_horiz</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-5">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex flex-col gap-2">
//                     <label className="text-sm font-medium text-text-secondary">Project Title</label>
//                     <input className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-primary outline-none" type="text" defaultValue={selectedProject?.title} />
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <label className="text-sm font-medium text-text-secondary">Slug</label>
//                     <input className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-2.5 text-sm text-text-secondary focus:ring-1 focus:ring-primary outline-none font-mono" type="text" defaultValue={selectedProject?.slug} />
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-medium text-text-secondary">Description</label>
//                   <textarea className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none resize-none" rows={4} defaultValue={selectedProject?.description} />
//                 </div>
//                 <div>
//                   <span className="text-sm font-medium text-text-secondary block mb-2">Cover Image</span>
//                   <div className="border-2 border-dashed border-border-dark rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-background-dark/50 transition-colors cursor-pointer group relative overflow-hidden h-40">
//                     <img src={selectedProject?.image} className="absolute inset-0 object-cover opacity-50 w-full h-full" alt="Cover" />
//                     <div className="relative z-10 py-4">
//                       <span className="material-symbols-outlined text-white text-3xl mb-2">cloud_upload</span>
//                       <p className="text-sm text-white font-medium">Click to upload new</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="flex flex-col gap-2">
//                     <span className="text-sm font-medium text-text-secondary">Tech Stack</span>
//                     <div className="flex flex-wrap gap-2 p-2 bg-background-dark border border-border-dark rounded-lg min-h-[46px]">
//                       {selectedProject?.tags.map(tag => (
//                         <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface-dark text-xs text-white">
//                           {tag} <button className="hover:text-red-400"><span className="material-symbols-outlined text-[14px]">close</span></button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <span className="text-sm font-medium text-text-secondary">Project Status</span>
//                     <div className="flex items-center justify-between bg-background-dark border border-border-dark rounded-lg p-2.5">
//                       <span className="text-sm text-white">{selectedProject?.status}</span>
//                       <button className={`w-11 h-6 rounded-full relative transition-colors ${selectedProject?.status === 'live' ? 'bg-primary' : 'bg-border-dark'}`}>
//                         <span className={`absolute top-1 size-4 bg-white rounded-full transition-all ${selectedProject?.status === 'live' ? 'right-1' : 'left-1'}`} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="pt-4 border-t border-border-dark flex items-center justify-end gap-3 mt-auto">
//                 <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors" onClick={() => setSelectedProject(null)}>Cancel</button>
//                 <button className="px-6 py-2 text-sm font-bold text-background-dark bg-primary hover:brightness-110 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
//                   <span className="material-symbols-outlined text-[18px]">save</span>
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProjects;
import React, { useEffect, useState } from "react";
import { apiService } from "@/src/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Project } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/ui/DataTable";
import ConfirmModal from "@/src/components/ui/ConfirmModal";

const AdminProjects: React.FC = () => {
  const navigate = useNavigate();
  const IMAGE_BASE = import.meta.env.VITE_IMAGE_API_BASE;
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();

  // Fetch Projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects-admin"],
    queryFn: () => apiService.getProjects({}),
    select: (res) => (res.success && res.data ? res.data : []),
  });

  // Delete Project
  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteProject(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
      setDeletingProjectId(null);
    },
    onError: () => {
      toast.error("Something went wrong");
      setDeletingProjectId(null);
    },
  });
  // Save Project

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Project",
        cell: ({ row }) => {
          const project = row.original;
          return (
            <div className="flex items-center gap-3">
              <img
                src={`${IMAGE_BASE}${project.image}`}
                className="h-10 w-10 rounded-lg object-cover border border-border-dark"
                alt={project.title}
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {project.title}
                </p>
                <p className="text-xs text-text-secondary">/{project.slug}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                status === "live"
                  ? "bg-green-500/10 text-green-400"
                  : status === "draft"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-gray-500/10 text-gray-400"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const project = row.original;

          return (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => navigate(`/admin/projects/${project._id}`)}
                className="p-1.5 rounded-md hover:bg-primary/20 text-primary transition-colors"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => setDeletingProjectId(project._id!)}
                className="p-1.5 rounded-md hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [projects],
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white mb-1">Projects</h2>
          <p className="text-text-secondary">
            Manage and track your portfolio projects
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/projects/add")}
          className="flex items-center gap-2 bg-primary hover:brightness-110 text-background-dark px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add Project</span>
        </button>
      </div>

      <div className="w-full h-full min-h-0">
        {/* LEFT TABLE */}
        {/* <div className="col-span-12 xl:col-span-7 flex flex-col gap-4 min-h-0">
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-dark bg-background-dark/30">
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Project Title
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        <div className="spinner"></div>
                      </td>
                    </tr>
                  ) : (
                    projects?.map((project: any) => (
                      <tr
                        key={project?._id}
                        className={`group hover:bg-background-dark/50 transition-colors cursor-pointer ${
                          project?._id === project?._id ? "bg-primary/5" : ""
                        }`}
                      >
                        <td
                          className="px-6 py-4"
                          onClick={() =>
                            navigate(`/admin/projects/${project?._id}`)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={`${IMAGE_BASE}${project?.image}`}
                              className="h-10 w-10 rounded-lg object-cover shrink-0 border border-border-dark"
                              alt={project?.title}
                            />
                            <div>
                              <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                                {project?.title}
                              </p>
                              <p className="text-xs text-text-secondary">
                                /{project?.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                              project?.status === "live"
                                ? "bg-green-500/10 text-green-400"
                                : project?.status === "draft"
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-gray-500/10 text-gray-400"
                            }`}
                          >
                            {project?.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/projects/${project?._id}`)
                              }
                              className="p-1.5 rounded-md hover:bg-primary/20 text-primary transition-colors"
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(project?._id as string)
                              }
                              className="p-1.5 rounded-md hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}

        <div className="bg-surface-dark border border-border-dark rounded-xl p-4">
          <DataTable columns={columns} data={projects} isLoading={isLoading} />
        </div>
      </div>

      <ConfirmModal
        open={!!deletingProjectId}
        title="Delete Project?"
        description="This project will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteProjectMutation.isPending}
        onCancel={() => setDeletingProjectId(null)}
        onConfirm={() => {
          if (!deletingProjectId) return;
          deleteProjectMutation.mutate(deletingProjectId, {
            onSuccess: () => setDeletingProjectId(null),
          });
        }}
      />
    </div>
  );
};

export default AdminProjects;
