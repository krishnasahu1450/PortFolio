import React, { useState } from "react";
import { EXPERIENCES } from "../constants";
import { Experience } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";
import { toast } from "sonner";
import { PencilIcon, Trash2 } from "lucide-react";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { formatDate } from "@/src/utils/formatDate";

const AdminExperience: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Experience>({
    _id: "",
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    logo: "",
  });
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => apiService.getExperiences(),
    select: (res) => (res.success ? res.data : []),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiService.createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience added");
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      apiService.updateExperience(editingExperience?._id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience updated");
      setIsModalOpen(false);
      setEditingExperience(null);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience deleted");
    },
  });

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    };

    if (editingExperience) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Professional Timeline
          </h1>
          <p className="text-text-secondary text-base">
            Manage your work history. Drag and drop items to reorder how they
            appear on your portfolio.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-primary hover:brightness-110 text-background-dark px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20"
          onClick={() => {
            setEditingExperience(null);
            setFormData({
              _id: "",
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
              logo: "",
            });
            setIsModalOpen(true);
          }}
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Experience</span>
        </button>
      </div>

      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8 mt-4 relative">
        <div className="absolute left-[54px] md:left-[62px] top-8 bottom-8 w-[2px] bg-border-dark/50 z-0"></div>
        <div className="flex flex-col gap-6 relative z-10">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group relative flex gap-4 md:gap-6 items-start transition-all duration-200"
            >
              <div className="flex flex-col items-center gap-2 pt-1">
                <div className="p-1 rounded hover:bg-border-dark/50 text-text-secondary hover:text-white transition-colors cursor-grab">
                  <span className="material-symbols-outlined text-xl">
                    drag_indicator
                  </span>
                </div>
                <div
                  className={`size-3 rounded-full ${exp.current ? "bg-primary" : "bg-border-dark"} mt-2 ring-4 ring-surface-dark`}
                ></div>
              </div>
              <div className="flex-1 bg-background-dark border border-border-dark hover:border-primary/50 rounded-lg p-5 transition-all group-hover:shadow-lg group-hover:shadow-primary/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="size-12 rounded-lg bg-surface-dark border border-border-dark flex items-center justify-center flex-shrink-0">
                      {exp.logo ? (
                        <img src={exp.logo} className="size-8 object-contain" />
                      ) : (
                        <span className="material-symbols-outlined text-text-secondary">
                          work
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-text-secondary text-sm mt-1">
                        <span className="font-medium text-primary">
                          {exp.company}
                        </span>
                        <span className="size-1 bg-text-secondary rounded-full"></span>
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="px-2 py-1 rounded bg-border-dark/50 text-xs text-text-secondary font-mono border border-border-dark">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                        {exp.current && (
                          <span className="px-2 py-1 rounded bg-green-500/10 text-xs text-green-400 font-medium border border-green-500/20">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:self-center">
                    <button
                      className="p-2 text-text-secondary hover:text-white hover:bg-border-dark rounded transition-colors"
                      onClick={() => {
                        setEditingExperience(exp);
                        setFormData(exp);
                        setIsModalOpen(true);
                      }}
                    >
                      <PencilIcon size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteId(exp._id)}
                      className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-[600px] bg-surface-dark rounded-xl border border-border-dark shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border-dark">
              <h3 className="text-white text-lg font-bold">
                {editingExperience ? "Edit Experience" : "Add Experience"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined text-text-secondary">
                  close
                </span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <input
                className="bg-background-dark border border-border-dark rounded-lg px-4 py-2 text-white"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                className="bg-background-dark border border-border-dark rounded-lg px-4 py-2 text-white"
                placeholder="Company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />

              <input
                className="bg-background-dark border border-border-dark rounded-lg px-4 py-2 text-white"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <div className="flex gap-4">
                <input
                  type="month"
                  className="flex-1 bg-background-dark border border-border-dark rounded-lg px-4 py-2 text-white"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />

                <input
                  type="month"
                  disabled={formData.current}
                  className="flex-1 bg-background-dark border border-border-dark rounded-lg px-4 py-2 text-white"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>

              <label className="flex items-center gap-2 text-text-secondary">
                <input
                  type="checkbox"
                  checked={formData.current}
                  onChange={(e) =>
                    setFormData({ ...formData, current: e.target.checked })
                  }
                />
                Currently Working Here
              </label>

              <textarea
                className="bg-background-dark border border-border-dark rounded-lg px-4 py-2 text-white"
                placeholder="Description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="p-5 border-t border-border-dark flex justify-end gap-3 bg-background-dark/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-primary hover:brightness-110 shadow-lg shadow-primary/20"
              >
                {editingExperience
                  ? updateMutation.isPending
                    ? "Updating..."
                    : "Update"
                  : createMutation.isPending
                    ? "Adding..."
                    : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteId}
        title="Delete Skill?"
        description="This skill will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          deleteMutation.mutate(deleteId, {
            onSuccess: () => setDeleteId(null),
          });
        }}
      />
    </div>
  );
};

export default AdminExperience;
