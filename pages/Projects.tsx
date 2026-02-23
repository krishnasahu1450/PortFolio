import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../src/hooks/useData";
import { useDebounce } from "../src/hooks/useDebounce";
const Projects: React.FC = () => {
  const IMAGE_BASE = import.meta.env.VITE_IMAGE_API_BASE;
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const debouncedSearch = useDebounce(search, 500);

  const { projects, loading, error } = useProjects({
    status: "live",
    // featured: true,
    category: typeFilter === "All" ? undefined : typeFilter,
    search: debouncedSearch,
  });

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-8 md:py-12">
      <div className="flex flex-col gap-3 mb-10 animate-fade-in-up">
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
          My Work
        </h1>
        <p className="text-text-secondary text-lg font-normal leading-normal max-w-2xl">
          A selection of projects I've built, ranging from web applications to
          design systems.
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10 items-stretch lg:items-end">
        <div className="flex-1">
          <label className="flex flex-col h-full">
            <span className="text-white text-sm font-medium leading-normal pb-2 ml-1">
              Search
            </span>
            <div className="flex w-full flex-1 items-stretch rounded-lg h-12 bg-surface-dark border border-border-dark overflow-hidden focus-within:border-primary">
              <div className="text-text-secondary flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
              type="search"
                className="w-full bg-transparent border-none text-white focus:ring-0 px-4 text-base font-normal"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className="w-full lg:w-64">
          <label className="flex flex-col h-full">
            <span className="text-white text-sm font-medium leading-normal pb-2 ml-1">
              Technology
            </span>
            <div className="relative">
              <select
                className="w-full bg-surface-dark border-border-dark text-white rounded-lg h-12 pl-4 pr-10 focus:border-primary focus:ring-0 appearance-none"
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
              >
                <option value="All">All Technologies</option>
                <option value="react">React</option>
                <option value="next.js">Next.js</option>
                <option value="flutter">Flutter</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </div>
            </div>
          </label>
        </div>
        <button
          className="text-primary text-sm font-medium hover:text-white transition-colors h-12 flex items-center"
          onClick={() => {
            setSearch("");
            setTechFilter("All");
            setTypeFilter("All");
          }}
        >
          Reset
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-surface-dark rounded-xl overflow-hidden border border-border-dark animate-pulse"
            >
              <div className="w-full aspect-video bg-slate-700"></div>
              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="h-6 bg-slate-700 rounded"></div>
                  <div className="h-16 bg-slate-700 rounded"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="w-16 h-6 bg-slate-700 rounded"></div>
                  <div className="w-20 h-6 bg-slate-700 rounded"></div>
                </div>
                <div className="h-10 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-400 text-2xl">
              error
            </span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">
            Failed to load projects
          </h3>
          <p className="text-text-secondary">{error.toString()}</p>
        </div>
      ) : projects?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-slate-400 text-2xl">
              search_off
            </span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">
            No projects found
          </h3>
          <p className="text-text-secondary">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects?.map((project: any) => (
            <article
              key={project?.id}
              className="group flex flex-col bg-surface-dark rounded-xl overflow-hidden border border-border-dark hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={`${IMAGE_BASE}${project?.image}`}
                  alt={project?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 to-transparent opacity-60"></div>
              </div>
              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {project?.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {project?.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project?.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-border-dark text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to={`/projects/${project?.slug}`}
                    className="flex-1 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-background-dark rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                    View Live
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
