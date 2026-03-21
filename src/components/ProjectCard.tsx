import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  link?: string;
  github?: string;
}

export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/40 backdrop-blur-md rounded-[2rem] p-10 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-black/5 h-full flex flex-col justify-between"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-apple-silver mb-4">
          {project.category}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          {project.title}
        </h3>
        <p className="text-apple-text/70 text-lg leading-relaxed mb-8 max-w-md">
          {project.description}
        </p>
      </div>
      <div className="flex gap-6">
        {project.link && (
          <a
            href={project.link}
            className="flex items-center gap-2 text-sm font-semibold text-apple-blue hover:underline"
          >
            View Project <ExternalLink size={16} />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            className="flex items-center gap-2 text-sm font-semibold text-apple-text hover:opacity-70"
          >
            Source <Github size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
};
