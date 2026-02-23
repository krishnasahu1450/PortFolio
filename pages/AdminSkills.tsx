import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";
import { toast } from "sonner";
import { Pencil, Trash2Icon, X } from "lucide-react";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { getSkillIcon } from "@/src/hooks/helper";
import DynamicIcon from "@/src/components/ui/DynamicIcon";

const AdminSkills: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Frontend",
    proficiency: 50,
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ✅ Fetch skills
  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => apiService.getSkills(),
    select: (res) => (res.success ? res.data : []),
  });

  // ✅ Create
  const createMutation = useMutation({
    mutationFn: (newSkill: any) => apiService.createSkill(newSkill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill added");
      setIsModalOpen(false);
      setNewSkill({ name: "", category: "Frontend", proficiency: 50 });
    },
  });
  const updateMutation = useMutation({
    mutationFn: (updatedSkill: any) =>
      apiService.updateSkill(updatedSkill?.id, updatedSkill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated");
      setIsModalOpen(false);
      setNewSkill({ name: "", category: "Frontend", proficiency: 50 });
    },
  });

  // ✅ Toggle Status
  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: any) => apiService.updateSkill(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  // ✅ Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted");
    },
  });

  const toggleSkillStatus = (skill: any) => {
    toggleMutation.mutate({
      id: skill?._id,
      status: skill?.status === "active" ? "inactive" : "active",
    });
  };

  const saveSkill = () => {
    if (!newSkill?.name.trim()) return;

    const payload = {
      ...newSkill,
      icon: getSkillIcon(newSkill?.name),
      status: "active",
    };

    if (editingSkill) {
      updateMutation.mutate({
        id: editingSkill?._id,
        ...payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-3xl font-bold tracking-tight">
            Skills Management
          </h2>
          <p className="text-text-secondary">
            Manage your technical proficiency and expertise levels visible on
            your portfolio.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSkill(null);
            setNewSkill({
              name: "",
              category: "Frontend",
              proficiency: 50,
            });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:brightness-110 transition-colors h-10 px-5 text-white text-sm font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add New Skill</span>
        </button>
      </div>
      <div className="flex flex-col bg-background-dark border border-border-dark rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-dark border-b border-border-dark">
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Skill Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Proficiency
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
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
                  <td colSpan={5} className="text-center py-6 text-white">
                    Loading...
                  </td>
                </tr>
              ) : (
                skills.map((skill: any) => (
                  <tr
                    key={skill?._id}
                    className="group hover:bg-surface-dark transition-colors"
                  >
                    <td className="px-6 py-4 text-white">
                      <div className="flex items-center gap-3">
                        <DynamicIcon name={skill?.icon} size={20} />
                        <span>{skill?.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {skill?.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="h-1.5 w-full bg-border-dark rounded-full overflow-hidden max-w-[200px]">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${skill?.proficiency}%` }}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleSkillStatus(skill)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          skill?.status === "active"
                            ? "bg-primary"
                            : "bg-border-dark"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            skill?.status === "active"
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingSkill(skill);
                            setNewSkill({
                              name: skill?.name,
                              category: skill?.category,
                              proficiency: skill?.proficiency,
                            });
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil
                            size={20}
                            className="text-text-secondary hover:text-primary transition-colors"
                          />
                        </button>
                        <button
                          onClick={() => setDeleteId(skill?._id)}
                          className="p-1.5 rounded-md text-text-secondary hover:text-red-400 transition-colors"
                        >
                          <Trash2Icon size={20} />
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
      {/* Modal unchanged UI */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] bg-surface-dark rounded-xl border border-border-dark shadow-2xl overflow-hidden">
            <div className="p-6 flex flex-col gap-6">
              <input
                className="w-full bg-background-dark rounded-lg px-4 py-2.5 text-white"
                placeholder="Skill name"
                value={newSkill?.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
              />
              <button
                onClick={saveSkill}
                className="bg-primary px-6 py-2 rounded-lg text-white font-bold"
              >
                  {editingSkill ? "Update Skill" : "Save Skill"}
              </button>
            </div>
          </div>
        </div>
      )} */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] bg-surface-dark rounded-xl border border-border-dark shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border-dark">
              <h3 className="text-white text-lg font-bold">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-secondary hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">
                  Skill Name
                </label>
                <input
                  className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary outline-none"
                  placeholder="e.g. Docker, Vue.js"
                  type="text"
                  value={newSkill?.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase">
                  Category
                </label>
                <select
                  className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-primary outline-none"
                  value={newSkill?.category}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, category: e.target.value })
                  }
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design">Design</option>
                  <option value="Tools">Tools</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-text-secondary uppercase">
                    Proficiency
                  </label>
                  <span className="text-primary font-bold text-sm">
                    {newSkill?.proficiency}%
                  </span>
                </div>
                <input
                  type="range"
                  className="w-full accent-primary"
                  min="0"
                  max="100"
                  value={newSkill?.proficiency}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      proficiency: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="p-5 border-t border-border-dark flex justify-end gap-3 bg-background-dark/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSkill}
                disabled={
                  !newSkill?.name.trim() ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
                className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-primary hover:brightness-110 shadow-lg shadow-primary/20"
              >
                {editingSkill
                  ? updateMutation.isPending
                    ? "Updating..."
                    : "Update Skill"
                  : createMutation.isPending
                    ? "Adding..."
                    : "Add Skill"}
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

export default AdminSkills;
