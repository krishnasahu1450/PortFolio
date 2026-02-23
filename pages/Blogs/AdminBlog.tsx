// import { BLOG_POSTS } from '@/constants';
// import { apiService } from '@/src/services/api';
// import { BlogPost } from '@/types';
// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminBlog: React.FC = () => {
//    const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   // ✅ Fetch from API
//   const { data: posts = [], isLoading } = useQuery({
//     queryKey: ["blogs", search],
//     queryFn: () => apiService.getBlogPosts({ search }),
//     select: (res) => (res.success ? res.data : []),
//   });

//   return (
//     <div className="flex flex-col gap-8 h-full">
//       <div className="flex flex-wrap justify-between items-center gap-4">
//         <h2 className="text-3xl font-black text-white">Blog Management</h2>
//         <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:brightness-110 text-background-dark font-bold shadow-lg shadow-primary/20">
//           <span className="material-symbols-outlined">add</span>
//           <span>Create New Post</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0">
//         <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto no-scrollbar">
//           <div className="bg-surface-dark rounded-xl p-4 flex flex-col gap-4 border border-border-dark shrink-0">
//             <div className="relative w-full">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-[20px]">search</span>
//               <input className="block w-full p-2.5 pl-10 text-sm text-white bg-background-dark border-none rounded-lg placeholder-text-secondary focus:ring-1 focus:ring-primary" placeholder="Search posts..." />
//             </div>
//           </div>
//           <div className="flex-1 flex flex-col gap-3">
//             {posts.map((post) => (
//               <div
//                 key={post.id}
//                 onClick={() => setSelectedPost(post)}
//                 className={`p-4 rounded-xl border transition-all cursor-pointer ${
//                   selectedPost?.id === post.id ? 'bg-border-dark border-primary/50 shadow-md' : 'bg-surface-dark border-transparent hover:border-border-dark hover:bg-surface-dark/50'
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">{post.category}</span>
//                   <span className={`size-2 rounded-full ${post.status === 'Published' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
//                 </div>
//                 <h3 className="text-white text-base font-semibold mb-1 truncate">{post.title}</h3>
//                 <p className="text-text-secondary text-xs line-clamp-2">{post.excerpt}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar pb-20">
//           {selectedPost && (
//             <div className="flex flex-col bg-surface-dark rounded-xl border border-border-dark flex-1 overflow-hidden shadow-2xl animate-in fade-in duration-300">
//               <div className="flex items-center gap-1 p-2 border-b border-border-dark bg-background-dark/50">
//                 <button className="p-2 rounded hover:bg-border-dark text-text-secondary hover:text-white transition-colors" title="Bold"><span className="material-symbols-outlined">format_bold</span></button>
//                 <button className="p-2 rounded hover:bg-border-dark text-text-secondary hover:text-white transition-colors" title="Italic"><span className="material-symbols-outlined">format_italic</span></button>
//                 <div className="w-px h-5 bg-border-dark mx-1"></div>
//                 <button className="p-2 rounded hover:bg-border-dark text-text-secondary hover:text-white transition-colors"><span className="material-symbols-outlined">format_h1</span></button>
//                 <button className="p-2 rounded hover:bg-border-dark text-text-secondary hover:text-white transition-colors"><span className="material-symbols-outlined">format_h2</span></button>
//                 <div className="flex-1"></div>
//                 <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-border-dark text-text-secondary text-xs hover:text-white">
//                   <span className="material-symbols-outlined text-[16px]">preview</span>
//                   Preview
//                 </button>
//               </div>
//               <div className="flex-1 p-8 overflow-y-auto">
//                 <input className="w-full bg-transparent border-none text-4xl font-bold text-white placeholder-border-dark focus:ring-0 px-0 mb-6" defaultValue={selectedPost.title} />
//                 <div className="relative w-full h-48 rounded-lg bg-background-dark mb-8 border border-dashed border-border-dark flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden">
//                   <img src={selectedPost.image} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Cover" />
//                   <div className="relative z-10 flex flex-col items-center gap-2 text-text-secondary">
//                     <span className="material-symbols-outlined text-[32px]">add_photo_alternate</span>
//                     <span className="text-sm font-medium">Change Cover Image</span>
//                   </div>
//                 </div>
//                 <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed min-h-[300px]">
//                   {selectedPost.excerpt}
//                 </div>
//               </div>
//               <div className="p-4 border-t border-border-dark flex justify-end gap-3 bg-background-dark/30">
//                 <button className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-white transition-colors">Save Draft</button>
//                 <button className="px-6 py-2 text-sm font-bold bg-primary text-background-dark rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 transition-all">Update Post</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminBlog;

import ConfirmModal from "@/src/components/ui/ConfirmModal";
import { apiService } from "@/src/services/api";
import { BlogPost } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminBlog: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ✅ Fetch blogs
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blogs", search],
    queryFn: () => apiService.getBlogPosts({ search }),
    select: (res) => (res.success ? res.data : []),
  });

  // ✅ Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Post deleted");
    },
  });

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-3xl font-black text-white">Blog Management</h2>

        <button
          onClick={() => navigate("/admin/blog/create")}
          className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:brightness-110 text-background-dark font-bold shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Create New Post</span>
        </button>
      </div>

      <div className="bg-surface-dark rounded-xl p-4 border border-border-dark">
        <div className="relative w-full mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-[20px]">
            search
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-2.5 pl-10 text-sm text-white bg-background-dark border-none rounded-lg placeholder-text-secondary focus:ring-1 focus:ring-primary"
            placeholder="Search posts..."
          />
        </div>

        {isLoading ? (
          <p className="text-white text-center py-10">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post: BlogPost) => (
              <div
                key={post._id}
                className="bg-background-dark rounded-xl border border-border-dark hover:border-primary/40 transition-all shadow-sm overflow-hidden flex flex-col"
              >
                {/* Cover */}
                <div className="relative h-40">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                      {post.category}
                    </span>

                    <span
                      className={`size-2 rounded-full ${
                        post.status === "published"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      }`}
                    ></span>
                  </div>

                  <h3 className="text-white text-base font-semibold mb-1 line-clamp-1">
                    {post.title}
                  </h3>

                  <p className="text-text-secondary text-xs line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/admin/blog/${post._id}`)}
                      className="px-3 py-1.5 text-xs rounded bg-border-dark text-white hover:bg-primary transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteId(post._id as string)}
                      className="px-3 py-1.5 text-xs rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        open={!!deleteId}
        title="Delete Blog Post?"
        description="This blog post will be permanently removed."
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

export default AdminBlog;
