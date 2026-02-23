import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Testimonial } from "../types";
import { apiService } from "@/src/services/api";
import { formatDate } from "@/src/utils/formatDate";
import { PencilIcon, Plus, Trash2 } from "lucide-react";
import TestimonialModal from "@/src/components/TestimonialModal";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { toast } from "sonner";

const AdminTestimonials: React.FC = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: testimonialsData } = useQuery({
    queryKey: ["testimonials"],
    queryFn: apiService.getTestimonials,
  });

  const testimonialsList = testimonialsData ? testimonialsData.data : [];
  const testimonials = testimonialsList as Testimonial[];
  const createMutation = useMutation({
    mutationFn: apiService.createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setModalOpen(false);
      toast.success("Testimonial created");
    },
  });

  const updateMutation = useMutation({
    mutationFn: apiService.updateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setModalOpen(false);
      toast.success("Testimonial updated");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: apiService.toggleVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Visibility toggled");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
    },
  });

  const handleSubmit = (formData: FormData) => {
    if (editingData?._id) {
      updateMutation.mutate({ id: editingData._id, payload: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const toggleVisibility = (id: string) => {
    toggleMutation.mutate(id);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Testimonials
          </h1>
          <p className="text-text-secondary text-base">
            Manage and moderate client feedback.{" "}
            <span className="text-primary font-semibold">
              Total: {testimonials.length}
            </span>
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-primary hover:brightness-110 text-background-dark px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-primary/20 transition-all"
          onClick={() => {
            setEditingData(null);
            setModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Manual Testimonial</span>
        </button>
      </div>

      <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="bg-background-dark border-b border-border-dark">
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Client
                </th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Rating
                </th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Visibility
                </th>
                <th className="p-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {testimonials.map((t) => (
                <tr
                  key={t._id}
                  className="group hover:bg-background-dark transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.image}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        alt={t.name}
                      />
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">
                          {t.name}
                        </span>
                        <span className="text-text-secondary/50 text-xs">
                          {t.company}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">
                    {formatDate(t.createdAt, "MMMM d, yyyy")}
                  </td>
                  <td className="p-4">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-[18px] ${i < t.rating ? "fill-1" : "opacity-20"}`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${t.status === "live" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : t.status === "pending" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 flex items-center">
                    <button
                      disabled={toggleMutation.isPending}
                      onClick={() => toggleMutation.mutate(t._id)}
                      aria-label="Toggle Visibility"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        t.visibility === "show" ? "bg-primary" : "bg-slate-600"
                      } ${toggleMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span
                        className={`absolute left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                          t.visibility === "show"
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="ml-3 text-sm font-medium text-text-secondary group-hover:text-white">
                      {t.visibility.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setEditingData(t);
                        setModalOpen(true);
                      }}
                      className="p-1.5 rounded-md mr-2 text-text-secondary hover:text-primary transition-colors"
                    >
                      <PencilIcon size={20} />
                    </button>
                    <button className="p-1.5 rounded-md text-text-secondary hover:text-red-500 transition-colors">
                      <Trash2 size={20} onClick={() => setDeleteId(t._id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TestimonialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingData}
      />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Testimonial?"
        description="This testimonial will be permanently removed."
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

export default AdminTestimonials;
