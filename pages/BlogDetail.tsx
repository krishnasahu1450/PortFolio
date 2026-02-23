import React from "react";
import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";
import { formatDate } from "@/src/utils/formatDate";
import { toast } from "sonner";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API_BASE;
  const { data: post } = useQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => {
      return apiService.getBlogPostById(id!);
    },
    select: (res) => (res.success ? res.data : null),
  });

  if (!post)
    return (
      <div className="p-20 text-center text-2xl font-bold">Post not found</div>
    );

  return (
    <article className="w-full max-w-[800px] mx-auto px-6 py-12 md:py-20 flex flex-col gap-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-6">
        <h1 className="text-3xl md:text-5xl font-black leading-[1.15] tracking-tight text-white">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-border-dark pb-6">
          <div className="flex items-center gap-3">
            {/* <img
              src={post.author.avatar}
              width="40"
              height="40"
              className="size-10 rounded-full ring-2 ring-primary/20"
              alt="Alex"
            /> */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Alex Morgan</span>
              <span className="text-xs text-text-secondary">
                Senior Full Stack Engineer
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              <span>{formatDate(post.publishedAt, "MMMM d, yyyy")}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-text-secondary"></span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">
                schedule
              </span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface-dark relative group shadow-2xl">
        <img
          src={post.image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Cover"
        />
      </div>

      <div className="flex flex-col gap-6 text-lg leading-relaxed text-slate-300">
        <p className="font-medium text-white text-xl">
          Building exceptional digital products is not just about writing code;
          it's about solving real-world problems with elegance and efficiency.
        </p>
        <p>{post.excerpt}</p>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-2">
          The Core Concepts
        </h2>
        <p>
          In this tutorial, we will explore the fundamental patterns that make
          modern web development both challenging and rewarding. From component
          composition to state management, every decision counts.
        </p>

        <div className="my-6 rounded-lg overflow-hidden bg-[#0f1115] border border-border-dark shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-border-dark">
            <span className="text-xs font-mono text-gray-400">Example.tsx</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="font-mono text-sm leading-6">
              <span className="text-purple-400">import</span> React{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">'react'</span>;<br />
              <span className="text-purple-400">const</span> Component = ()
              =&gt; &#123;
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">const</span> [data,
              setData] = <span className="text-blue-400">useState</span>([]);
              <br />
              &nbsp;&nbsp;
              <span className="text-slate-500">// Complex logic here</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">return</span> &lt;
              <span className="text-red-400">div</span>&gt;Hello Portfolio&lt;/
              <span className="text-red-400">div</span>&gt;;
              <br />
              &#125;;
            </pre>
          </div>
        </div>

        <p>
          The result of these patterns is a 40% reduction in development time
          for new features. While the initial setup was heavy, the long-term
          payoff is undeniable.
        </p>
      </div>

      <div className="flex flex-col gap-8 mt-12 border-t border-border-dark pt-8">
        <div className="flex flex-wrap gap-2">
          {post?.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full bg-surface-dark text-primary hover:bg-primary hover:text-background-dark text-sm font-medium transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center bg-surface-dark p-6 rounded-xl border border-border-dark gap-4">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-white font-bold text-lg">
              Enjoyed the read?
            </span>
            <span className="text-text-secondary text-sm">
              Share this article with your network.
            </span>
          </div>
          <div className="flex gap-3">
            <button
              className="size-10 rounded-full bg-background-dark text-white hover:bg-primary hover:text-background-dark flex items-center justify-center transition-all"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    })
                    .catch((error) => {
                      console.error("Error sharing:", error);
                      toast.error("Failed to share the article.");
                    });
                } else {
                  toast.error(
                    "Web Share API is not supported in this browser.",
                  );
                }
              }}
            >
              <span className="material-symbols-outlined text-base">share</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 h-10 rounded-full bg-background-dark text-white hover:bg-primary hover:text-background-dark transition-all text-sm font-medium"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
            >
              <span className="material-symbols-outlined text-[18px]">
                link
              </span>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
