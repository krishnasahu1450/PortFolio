import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "../src/hooks/useData";
import { formatDate } from "@/src/utils/formatDate";

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { posts, loading, error } = useBlogPosts();
  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-[960px] mx-auto px-4 md:px-6 lg:px-0 py-8 md:py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-4 animate-fade-in-up">
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          Writing & Tutorials
        </h1>
        <p className="text-text-secondary text-base md:text-lg font-normal leading-normal max-w-2xl">
          Deep dives into code, design systems, and the future of technology. I
          write about what I learn to solidify my knowledge and help others.
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-2 no-scrollbar">
        <div className="flex gap-3 min-w-max">
          {categories?.map((cat: any) => (
            <button
              key={cat as string}
              onClick={() => setActiveCategory(cat)}
              className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-5 capitalize transition-all ${
                activeCategory === cat
                  ? "bg-primary text-background-dark font-bold"
                  : "bg-border-dark text-text-secondary hover:text-white"
              }`}
            >
              <p className="text-sm leading-normal">{cat}</p>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl bg-surface-dark border border-border-dark animate-pulse"
            >
              <div className="w-full aspect-video bg-slate-700"></div>
              <div className="flex flex-col flex-1 p-6 gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 bg-slate-700 rounded"></div>
                  <div className="w-20 h-3 bg-slate-700 rounded"></div>
                </div>
                <div className="h-6 bg-slate-700 rounded"></div>
                <div className="h-16 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 mt-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-400 text-2xl">
              error
            </span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">
            Failed to load blog posts
          </h3>
          <p className="text-text-secondary">
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 mt-4">
          <div className="w-16 h-16 bg-slate-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-slate-400 text-2xl">
              article
            </span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">No posts found</h3>
          <p className="text-text-secondary">
            No blog posts match the selected category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4">
          {filteredPosts.map((post) => (
            <Link
              to={`/blog/${post?._id}`}
              key={post?._id}
              className="flex flex-col overflow-hidden rounded-xl bg-surface-dark shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(19,182,236,0.15)] group border border-transparent hover:border-border-dark h-full"
            >
              <div className="w-full aspect-video bg-cover bg-center relative overflow-hidden">
                <img
                  src={post?.image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={post?.title}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
                <div className="absolute top-4 left-4 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-md border border-border-dark">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {post?.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6 gap-3">
                <div className="flex items-center gap-2 text-text-secondary text-xs font-medium  tracking-wider mb-1">
                  <span className="material-symbols-outlined text-[16px]">
                    calendar_today
                  </span>
                  <span>{formatDate(post.publishedAt, "MMMM d, yyyy")}</span>
                  <span className="w-1 h-1 bg-text-secondary rounded-full mx-1"></span>
                  <span className="material-symbols-outlined text-[16px]">
                    schedule
                  </span>
                  <span>{post?.readTime} min read</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {post?.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                  {post?.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                  Read Article
                  <span className="material-symbols-outlined text-sm ml-1">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
