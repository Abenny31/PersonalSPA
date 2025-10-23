import type { Project } from '../data/projects';

type ProjectCardProps = {
  project: Project;
  title: string;
  description: string;
  liveLabel: string;
  codeLabel: string;
};

const ProjectCard = ({ project, title, description, liveLabel, codeLabel }: ProjectCardProps) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-secondary">{title}</h3>
        <p className="mt-3 text-base text-slate-600">{description}</p>
      </div>
      {(project.liveUrl || project.sourceUrl) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {liveLabel}
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-secondary transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {codeLabel}
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
