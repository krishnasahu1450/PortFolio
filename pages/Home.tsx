import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useProjects,
  usePublicProfile,
  useSkills,
  useTestimonials,
} from "../src/hooks/useData";
import { TESTIMONIALS } from "../constants";
import DynamicIcon from "@/src/components/ui/DynamicIcon";
import { StarIcon } from "lucide-react";
import { stringToPastelColor } from "@/src/hooks/helper";

const Home: React.FC = () => {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API_BASE;
  const { projects, loading: projectsLoading } = useProjects({
    featured: true,
  });
  const { skills, loading: skillsLoading } = useSkills({ status: "active" });
  const { profile, loading } = usePublicProfile();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center pt-10 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#13b6ec 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary text-xs font-bold uppercase tracking-wide">
                  Available for Work
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                I'm {profile?.firstName}
                {(profile?.lastName && ` ${profile?.lastName}`) || "Deepak"}, a{" "}
                <br />
                <span className="text-primary">Full Stack Developer</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Crafting exceptional digital experiences with code and
                creativity. I specialize in building scalable web applications
                using React, Node.js, and modern UI/UX principles.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/projects"
                  className="px-8 h-12 rounded-lg bg-primary text-background-dark flex items-center justify-center font-bold text-base hover:opacity-90 transition-all transform hover:-translate-y-1"
                >
                  View Work
                </Link>
                <Link
                  to="/contact"
                  className="px-8 h-12 rounded-lg border border-slate-300 dark:border-border-dark bg-transparent text-slate-900 dark:text-white flex items-center justify-center font-bold text-base hover:bg-slate-200 dark:hover:bg-surface-dark transition-all"
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-surface-dark to-background-dark border border-border-dark shadow-2xl">
                <img
                  src={`${IMAGE_BASE_URL}${profile?.avatar}`}
                  alt="Developer workspace"
                  className="absolute inset-0 object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-surface-dark/90 backdrop-blur border border-border-dark p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                      <span className="material-symbols-outlined">
                        terminal
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">
                        Current Focus
                      </div>
                      <div className="text-sm font-bold text-white">
                        Scalable Full Stack Systems
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[85%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem
              icon="calendar_month"
              value="5+"
              label="Years Experience"
            />
            <StatItem
              icon="deployed_code"
              value="50+"
              label="Projects Completed"
            />
            <StatItem
              icon="sentiment_satisfied"
              value="30+"
              label="Happy Clients"
            />
            <StatItem icon="coffee" value="2K+" label="Cups of Coffee" />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
                My Tech Stack
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                A curated list of technologies I use to build robust and
                scalable digital products.
              </p>
            </div>
            <Link
              to="/about"
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors"
            >
              View Full About{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsLoading
              ? // Loading skeleton
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark animate-pulse"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="size-12 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                      <div className="w-8 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                ))
              : skills
                  .slice(0, 8)
                  .map((skill) => <SkillCard key={skill.id} {...skill} />)}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-white dark:bg-surface-dark border-y border-slate-200 dark:border-border-dark">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
                Featured Projects
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                Some of my best work. From complex web applications to beautiful
                marketing sites.
              </p>
            </div>
            <Link
              to="/projects"
              className="px-6 h-10 flex items-center rounded-lg border border-slate-300 dark:border-border-dark hover:bg-slate-100 dark:hover:bg-background-dark transition-colors text-sm font-bold"
            >
              View All Projects
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading
              ? // Loading skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="group flex flex-col bg-background-light dark:bg-background-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-border-dark animate-pulse"
                  >
                    <div className="aspect-video bg-slate-200 dark:bg-slate-700"></div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="w-20 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                      </div>
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                ))
              : projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
              What Clients Say
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Don't just take my word for it. Here's what people I've worked
              with have to say about my work ethic and results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.slice(0, 3).map((testimonial: any) => (
              <TestimonialCard key={testimonial?._id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-primary px-8 py-16 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-background-dark mb-4">
                Ready to start your next project?
              </h2>
              <p className="text-background-dark/80 text-lg font-medium">
                I'm currently available for freelance work and open to full-time
                opportunities. Let's build something amazing together.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                to="/contact"
                className="px-8 h-14 rounded-xl bg-background-dark text-white flex items-center justify-center font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Hire Me Now
              </Link>
              <button className="px-8 h-14 rounded-xl border-2 border-background-dark text-background-dark font-bold text-lg hover:bg-background-dark/10 transition-colors">
                View Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem: React.FC<{ icon: string; value: string; label: string }> = ({
  icon,
  value,
  label,
}) => (
  <div className="flex items-center gap-4">
    <div className="size-14 rounded-xl bg-background-light dark:bg-background-dark flex items-center justify-center text-primary border border-slate-200 dark:border-border-dark">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </p>
    </div>
  </div>
);

const SkillCard: React.FC<any> = ({ name, proficiency, icon }) => (
  <div className="group p-6 rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
    <div className="flex justify-between items-start mb-4">
      <div className="size-12 rounded-lg bg-background-light dark:bg-background-dark flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        {/* <span className="material-symbols-outlined text-2xl">{icon}</span> */}
        <DynamicIcon name={icon} className="text-4xl" />
      </div>
      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
        {proficiency}%
      </span>
    </div>
    <h3 className="text-lg font-bold mb-2">{name}</h3>
    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all duration-1000 ease-out"
        style={{ width: `${proficiency}%` }}
      ></div>
    </div>
  </div>
);

const ProjectCard: React.FC<any> = ({
  title,
  description,
  image,
  tags,
  slug,
}) => (
  <article className="group flex flex-col bg-background-light dark:bg-background-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
    <div className="relative aspect-video overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">
        {description}
      </p>
      <Link
        to={`/projects/${slug}`}
        className="w-full h-10 rounded-lg bg-slate-200 dark:bg-surface-dark text-slate-900 dark:text-white font-bold text-sm hover:bg-primary hover:text-background-dark transition-colors flex items-center justify-center gap-2"
      >
        View Case Study{" "}
        <span className="material-symbols-outlined text-lg">arrow_outward</span>
      </Link>
    </div>
  </article>
);

const TestimonialCard: React.FC<any> = ({
  name,
  role,
  company,
  content,
  rating,
  image,
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bgColor = stringToPastelColor(name || "User");
  return (
    <div className="p-8 rounded-2xl flex flex-col justify-between bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark relative h-full">
      <div>
        <span className="material-symbols-outlined text-4xl text-primary/20 absolute top-6 right-6">
          format_quote
        </span>

        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => {
            const isFilled = i < rating;

            return (
              <StarIcon
                key={i}
                className={`size-5 transition-colors ${
                  isFilled
                    ? "text-yellow-500"
                    : "text-slate-300 dark:text-slate-600"
                }`}
                fill={isFilled ? "currentColor" : "none"}
                stroke="currentColor"
              />
            );
          })}
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
          "{content}"
        </p>
      </div>

      {/* 🔥 Always Bottom */}
      <div className="flex items-center gap-4 mt-6">
        {!imgError && image ? (
          <img
            src={import.meta.env.VITE_IMAGE_URL + image}
            onError={() => setImgError(true)}
            className="size-12 rounded-full object-cover border-2 border-primary/20"
            alt={name}
          />
        ) : (
          <div
            className="size-12 rounded-full flex items-center justify-center font-bold capitalize text-lg border-2 border-white/30 shadow-sm"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
        )}

        <div>
          <h4 className="font-bold text-sm">{name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
