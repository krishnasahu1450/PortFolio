import React, { useState } from "react";
import { EXPERIENCES, SKILLS } from "../constants";
import {
  useExperiences,
  usePublicProfile,
  useSkills,
} from "@/src/hooks/useData";
import { formatDate } from "@/src/utils/formatDate";
import { toast } from "sonner";

const About: React.FC = () => {
  const { skills, loading: skillsLoading } = useSkills({ status: "active" });
  const { experiences, loading: experiencesLoading } = useExperiences();
  const { profile, loading } = usePublicProfile();
  const categories = [
    ...new Set(
      skills
        ?.map((s: any) => s?.category?.toLowerCase().trim())
        .filter(Boolean),
    ),
  ] as string[];
  const [activeTab, setActiveTab] = useState<any>("frontend");
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API_BASE;
  const handleDownload = async () => {
    try {
      const resumeUrl = profile?.resume
        ? `${IMAGE_BASE_URL}${profile.resume}`
        : "/sample-resume.pdf";

      const response = await fetch(resumeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Deepak_Sahu_Resume.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Resume downloaded successfully 🚀");
    } catch (error) {
      toast.error("Download failed ❌");
    }
  };
  return (
    <div className="flex-grow">
      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-cyan-400 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
              <div className="relative aspect-square w-64 md:w-80 lg:w-96 overflow-hidden rounded-xl bg-surface-dark border border-border-dark">
                <img
                  src={
                    profile?.avatar
                      ? `${IMAGE_BASE_URL}${profile?.avatar}`
                      : "/default-avatar.png"
                  }
                  className="h-full w-full object-cover"
                  alt="Deepak Sahu Portrait"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div>
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {profile?.jobTitle || "Full Stack Developer"}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                Hi, I'm{" "}
                <span className="text-primary">
                  {profile?.firstName} {profile?.lastName}
                </span>
                .
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto lg:mx-0">
              {profile?.bio ||
                `I specialize in building scalable web applications and intuitive
              user interfaces. With over 6 years of experience in the tech
              industry, I transform complex problems into elegant, efficient,
              and user-friendly digital solutions.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-background-dark transition-all hover:brightness-110 shadow-lg shadow-primary/25"
              >
                <span className="material-symbols-outlined text-[20px]">
                  download
                </span>
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-dark bg-surface-dark/30">
        <div className="mx-auto max-w-[960px] px-6 py-16 lg:px-0">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Technical Proficiency
            </h3>
            <p className="mt-2 text-text-secondary">
              My toolbelt for building modern applications.
            </p>
          </div>
          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-max border-b border-border-dark">
              {categories?.map((tab) => (
                <button
                  key={tab as string}
                  onClick={() => setActiveTab(tab)}
                  className={`group flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-bold capitalize transition-all ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tab === "frontend"
                      ? "code"
                      : tab === "backend"
                        ? "storage"
                        : tab === "tools"
                          ? "build"
                          : tab === "design"
                            ? "palette"
                            : tab === "devops"
                              ? "cloud"
                              : "build"}
                  </span>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {skills
              .filter(
                (s) => s.category?.toLowerCase() === activeTab.toLowerCase(),
              )
              .map((skill) => (
                <div key={skill.id} className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-border-dark">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-6 py-16 lg:px-0">
        <div className="mb-12 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">Experience</h3>
          <p className="mt-2 text-text-secondary">
            My professional journey so far.
          </p>
        </div>
        <div className="relative ml-4 md:ml-6">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-border-dark"></div>
          {experiences?.map((exp) => (
            <div key={exp._id} className="relative mb-12 pl-8 md:pl-12 group">
              <div className="absolute -left-[5px] top-2 h-[11px] w-[11px] rounded-full bg-background-dark border-2 border-primary group-hover:scale-150 transition-transform"></div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block"></span>
                <span className="text-base font-semibold text-primary">
                  {exp.company}
                </span>
              </div>
              <p className="mb-3 text-sm font-mono text-text-secondary mt-1">
                {formatDate(exp.startDate, "MMMM yyyy")} -{" "}
                {exp.current ? "Present" : formatDate(exp.endDate, "MMMM yyyy")}
              </p>
              <div className="rounded-lg bg-surface-dark border border-border-dark p-5 group-hover:border-primary/30 transition-all">
                <p className="text-text-secondary leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
