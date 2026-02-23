import React from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/src/services/api";

const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API_BASE;
  const { data: project } = useQuery({
    queryKey: ["projectDetail", slug],
    queryFn: () => {
      return apiService.getProjectById(slug!);
    },
    select: (res) => (res.success ? res.data : null),
  });

  // if (!project)
  //   return (
  //     <div className="p-20 text-center text-2xl font-bold">
  //       Project not found
  //     </div>
  //   );

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/projects"
            className="text-slate-500 hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-primary font-medium">{project?.title}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {project?.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              {project?.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project?.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-border-dark text-xs font-semibold uppercase tracking-wider text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {project?.demoUrl && (
              <Link
                to={project?.demoUrl || "#"}
                className="flex-1 lg:flex-none h-12 px-6 bg-primary text-background-dark rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(19,182,236,0.3)]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  rocket_launch
                </span>
                <span>Live Demo</span>
              </Link>
            )}
            {project?.githubUrl && (
              <Link
                to={project?.githubUrl || "#"}
                className="flex-1 lg:flex-none h-12 px-6 bg-transparent border border-border-dark text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-dark"
              >
                <span className="material-symbols-outlined text-[20px]">
                  code
                </span>
                <span>GitHub Repo</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-dark border border-border-dark shadow-2xl">
          <img
            src={
              project?.image
                ? `${IMAGE_BASE_URL}${project?.image}`
                : "/default-project-image.png"
            }
            alt={project?.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                description
              </span>
              Project Overview
            </h3>
            <div className="prose prose-lg prose-invert max-w-none text-text-secondary">
              <p>
                {project?.content ||
                  ` The goal of this project was to create a centralized hub for
                managing {project?.category.toLowerCase()} workflows. Built with
                performance and scalability in mind, it allows users to track
                critical data in real-time.`}
              </p>
              {/* <p>
                Leveraging {project?.tags.join(", ")}, we ensured a high-quality
                user experience with focus on responsive design and modern
                styling.
              </p> */}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="bg-surface-dark rounded-2xl p-6 border border-border-dark sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                stacks
              </span>
              Technologies Used
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {project?.tags?.map((tag: string) => (
                <div
                  key={tag}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-background-dark border border-transparent hover:border-primary/50 group cursor-default transition-all"
                >
                  <span className="text-xs font-semibold text-text-secondary group-hover:text-primary">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
