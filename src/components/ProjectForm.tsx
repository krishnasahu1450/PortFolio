import React, { useState } from "react";
import { Project } from "@/types";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  initialData?: Project | null;
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
}

const ProjectForm: React.FC<Props> = ({ initialData, onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project>(
    initialData || {
      title: "",
      slug: "",
      description: "",
      category: "",
      demoUrl: "",
      githubUrl: "",
      featured: false,
      order: 0,
      image: "",
      gallery: [],
      tags: [],
      status: "draft",
    },
  );
  const IMAGE_BASE = import.meta.env.VITE_IMAGE_API_BASE;
  const [file, setFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [newTag, setNewTag] = useState("");
  // Status toggle
  const toggleStatus = () => {
    if (!project) return;
    const nextStatus =
      project?.status === "live"
        ? "draft"
        : project?.status === "draft"
          ? "archived"
          : "live";
    setProject({ ...project, status: nextStatus });
  };

  // Tag handlers
  const removeTag = (tagToRemove: string) => {
    if (!project) return;
    setProject({
      ...project,
      tags: project?.tags.filter((t) => t !== tagToRemove),
    });
  };
  const addTag = () => {
    if (!project || !newTag.trim()) return;
    if (project?.tags.includes(newTag.trim())) return;
    setProject({
      ...project,
      tags: [...project?.tags, newTag.trim()],
    });
    setNewTag("");
  };

  // Gallery handler
  const addGalleryFiles = (files: FileList | null) => {
    if (!files) return;
    setGalleryFiles([...galleryFiles, ...Array.from(files)]);
  };
  const removeGalleryFile = (index: number) => {
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const formData = new FormData();

    // Basic fields
    formData.append("title", project.title.trim());

    const slugValue = project.slug
      ? project.slug
      : project.title.toLowerCase().replace(/\s+/g, "-");

    formData.append("slug", slugValue);

    formData.append("description", project.description || "");
    formData.append("category", project.category || "");
    formData.append("demoUrl", project.demoUrl || "");
    formData.append("githubUrl", project.githubUrl || "");
    formData.append("status", project.status);
    formData.append("featured", project.featured ? "true" : "false");
    formData.append("order", String(project.order ?? 0));

    // ✅ TAGS as array
    project.tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    // ✅ Single Image
    if (file) {
      formData.append("image", file);
    }

    // ✅ Multiple Gallery Images
    galleryFiles.forEach((galleryFile) => {
      formData.append("gallery", galleryFile);
    });

    onSubmit(formData);
  };

  return (
    <div className="w-full h-full min-h-0 animate-in fade-in slide-in-from-right duration-300 overflow-y-auto max-h-full no-scrollbar">
      <div className="bg-surface-dark border border-border-dark rounded-xl shadow-xl shadow-black/10 p-6 lg:p-8 flex flex-col gap-6">
        {/* Title */}
        <input
          value={project?.title || ""}
          onChange={(e) =>
            setProject({
              ...project,
              title: e.target.value,
            })
          }
          placeholder="Project title..."
          className="w-full text-2xl font-bold bg-background-dark text-white px-4 py-2 rounded-lg placeholder:text-text-secondary/70 focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* Slug & Order */}
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Slug</label>
            <input
              value={project?.slug || ""}
              onChange={(e) =>
                setProject({
                  ...project,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              className="bg-background-dark text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="project-slug"
            />
          </div> */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Order</label>
            <input
              type="number"
              value={project?.order || 0}
              onChange={(e) =>
                setProject({
                  ...project,
                  order: parseInt(e.target.value),
                })
              }
              className="bg-background-dark text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary">Category</label>
          <input
            value={project?.category || ""}
            onChange={(e) =>
              setProject({
                ...project,
                category: e.target.value,
              })
            }
            className="bg-background-dark text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Category"
          />
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-text-secondary">Featured</label>
          <input
            type="checkbox"
            checked={project?.featured || false}
            onChange={(e) =>
              setProject({
                ...project,
                featured: e.target.checked,
              })
            }
            className="w-5 h-5 accent-primary rounded"
          />
        </div>

        {/* Demo & GitHub */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Demo URL</label>
            <input
              value={project?.demoUrl || ""}
              onChange={(e) =>
                setProject({
                  ...project,
                  demoUrl: e.target.value,
                })
              }
              className="bg-background-dark text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-secondary">GitHub URL</label>
            <input
              value={project?.githubUrl || ""}
              onChange={(e) =>
                setProject({
                  ...project,
                  githubUrl: e.target.value,
                })
              }
              className="bg-background-dark text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-text-secondary">Status</label>
          <button
            onClick={toggleStatus}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              project?.status === "live"
                ? "bg-green-600 text-white"
                : project?.status === "draft"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-500 text-white"
            }`}
          >
            {project?.status}
          </button>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary">Description</label>
          <textarea
            rows={4}
            value={project?.description || ""}
            onChange={(e) =>
              setProject({
                ...project,
                description: e.target.value,
              })
            }
            className="bg-background-dark text-white text-sm rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Project description..."
          />
        </div>

        {/* Cover Image */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-text-secondary">Cover Image</label>
          <div className="border-2 border-dashed rounded-lg h-52 flex items-center justify-center cursor-pointer relative group overflow-hidden bg-background-dark hover:border-primary/60 transition">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded opacity-100"
              />
            ) : project?.image ? (
              <img
                src={`${IMAGE_BASE}${project?.image}`}
                alt="Current cover"
                className="absolute inset-0 w-full h-full object-cover rounded opacity-40"
              />
            ) : null}

            <div className="relative z-10 flex flex-col items-center gap-2 pointer-events-none">
              <span className="material-symbols-outlined text-4xl text-primary/70 group-hover:text-primary transition">
                cloud_upload
              </span>
              <p className="text-sm text-white">
                {file ? file.name : "Click or drag & drop"}
              </p>
            </div>

            {/* Only the input itself is clickable, rest ignores pointer-events */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-text-secondary">Gallery Images</label>
          <div className="flex gap-2 flex-wrap">
            {galleryFiles.map((file, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 rounded-lg overflow-hidden border border-border-dark"
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeGalleryFile(idx)}
                  className="absolute top-0 right-0 text-white bg-red-500 rounded px-1 hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer text-primary hover:border-primary/70 relative overflow-hidden">
              <Plus size={20} />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => addGalleryFiles(e.target.files)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-secondary">
            Tags / Tech Stack
          </label>
          <div className="flex flex-wrap gap-2 p-2 bg-background-dark border border-border-dark rounded-lg">
            {project?.tags?.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-dark text-xs text-white"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-text-secondary hover:text-red-400 transition"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Add tag & press Enter"
              className="bg-transparent text-xs text-white outline-none min-w-[100px] placeholder:text-text-secondary/60"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm text-text-secondary hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!project?.title.trim() || isLoading}
            className="px-5 py-2 bg-primary text-background-dark font-bold rounded-lg shadow hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="material-symbols-outlined">save</span>{" "}
            {project?._id
              ? isLoading
                ? "Updating..."
                : "Update"
              : isLoading
                ? "Creating..."
                : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
