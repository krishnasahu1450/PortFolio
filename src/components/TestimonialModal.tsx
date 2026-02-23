import { Testimonial } from "@/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Testimonial | null;
}

const TestimonialModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm<Testimonial>();

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset();
  }, [initialData, reset]);

  if (!open) return null;

  const submitHandler = (data: any) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value?.[0]) {
        formData.append("image", value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#1c252b] to-[#131a1f] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {initialData ? "Edit Testimonial" : "Add Testimonial"}
        </h2>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <Input
            label="Client Name"
            register={register("name", { required: true })}
          />

          {/* Role */}
          <Input label="Role" register={register("role")} />

          {/* Company */}
          <Input label="Company" register={register("company")} />

          {/* Rating */}
          <Input
            type="number"
            label="Rating (1-5)"
            register={register("rating", { required: true })}
            min="1"
            max="5"
          />

          {/* Visibility */}
          <Select
            label="Visibility"
            register={register("visibility")}
            options={["show", "hide"]}
          />

          {/* Status */}
          <Select
            label="Status"
            register={register("status")}
            options={["live", "pending", "rejected"]}
          />

          {/* Order */}
          <Input
            type="number"
            label="Display Order"
            register={register("order")}
          />

          {/* Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-text-secondary">Image</label>
            <input
              type="file"
              {...register("image")}
              className="text-sm text-white file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:text-black
      hover:file:brightness-110 cursor-pointer"
            />
          </div>

          {/* Content (Full Width) */}
          <div className="md:col-span-2">
            <Textarea label="Content" register={register("content")} />
          </div>

          {/* Buttons (Full Width) */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:brightness-110 text-black font-semibold rounded-lg transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;

const Input = ({ label, register, ...rest }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-text-secondary">{label}</label>
    <input
      {...register}
      {...rest}
      className="bg-[#1e2932] border border-white/10 focus:border-primary
      text-white rounded-lg px-4 py-2.5 outline-none transition"
    />
  </div>
);

const Textarea = ({ label, register }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-text-secondary">{label}</label>
    <textarea
      {...register}
      rows={4}
      className="bg-[#1e2932] border border-white/10 focus:border-primary
      text-white rounded-lg px-4 py-2.5 outline-none transition resize-none"
    />
  </div>
);

const Select = ({ label, register, options }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-text-secondary">{label}</label>
    <select
      {...register}
      className="bg-[#1e2932] border border-white/10 focus:border-primary
      text-white rounded-lg px-4 py-2.5 outline-none transition"
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="">
          {opt.toUpperCase()}
        </option>
      ))}
    </select>
  </div>
);
