import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";
import { toast } from "sonner";

const AdminBlogForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "development",
    tags: [],
    status: "draft",
    featured: false,
    readTime: 5,
    views: 0,
  });

  const [newTag, setNewTag] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // ✅ Fetch single blog (Edit mode)
  const { data } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => apiService.getBlogPostById(id),
    enabled: isEdit,
    select: (res) => (res.success ? res.data : null),
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // ✅ Create
  const createMutation = useMutation({
    mutationFn: (data: FormData) => apiService.createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog created");
      navigate("/admin/blog");
    },
  });

  // ✅ Update
  const updateMutation = useMutation({
    mutationFn: (data: FormData) =>
      apiService.updateBlogPost(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated");
      navigate("/admin/blog");
    },
  });

  // ✅ Tag Add
  const addTag = () => {
    if (!newTag.trim()) return;
    if (formData.tags.includes(newTag.trim())) return;

    setFormData({
      ...formData,
      tags: [...formData.tags, newTag.trim()],
    });
    setNewTag("");
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t: string) => t !== tag),
    });
  };

  // ✅ Save
 const handleSave = () => {
  if (!formData.title.trim()) return;

  const payload = new FormData();

  Object.entries(formData).forEach(([key, value]) => {

    // ❌ Never send _id
    if (key === "_id") return;

    if (key === "tags") {
      (value as string[]).forEach((tag) =>
        payload.append("tags", tag)
      );
      return;
    }

    if (typeof value === "boolean") {
      payload.append(key, value ? "true" : "false");
      return;
    }

    if (value !== undefined && value !== null) {
      payload.append(key, value as any);
    }
  });

  if (imageFile) {
    payload.append("image", imageFile);
  }

  if (isEdit) updateMutation.mutate(payload);
  else createMutation.mutate(payload);
};


  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white">
          {isEdit ? "Edit Blog Post" : "Create Blog Post"}
        </h2>
      </div>

      <div className="bg-surface-dark border border-border-dark rounded-xl p-8 flex flex-col gap-6">

        {/* Title */}
        <input
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
              slug: e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
            })
          }
          placeholder="Blog title..."
          className="w-full text-3xl font-bold bg-background-dark text-white px-4 py-3 rounded-lg"
        />

        {/* Category & Status */}
        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="bg-background-dark text-white px-3 py-2 rounded-lg"
          >
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="tech-trends">Tech Trends</option>
            <option value="personal">Personal</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="bg-background-dark text-white px-3 py-2 rounded-lg"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Featured */}
        <label className="flex items-center gap-2 text-text-secondary">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({
                ...formData,
                featured: e.target.checked,
              })
            }
          />
          Featured Post
        </label>

        {/* Excerpt */}
        <textarea
          rows={3}
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          placeholder="Short description..."
          className="bg-background-dark text-white px-4 py-2 rounded-lg"
        />

        {/* Content */}
        <textarea
          rows={8}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Blog content..."
          className="bg-background-dark text-white px-4 py-2 rounded-lg"
        />

        {/* Tags */}
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-border-dark text-xs text-white flex items-center gap-1"
              >
                {tag}
                <button onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            placeholder="Add tag & press Enter"
            className="bg-background-dark text-white px-3 py-2 rounded-lg w-full"
          />
        </div>

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files?.[0] || null)
          }
          className="text-white"
        />

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/admin/blog")}
            className="px-4 py-2 text-text-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-background-dark rounded-lg font-bold"
          >
            {isEdit ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogForm;
