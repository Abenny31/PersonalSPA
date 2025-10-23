import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { t } = useTranslation();
  const liveLabel = t('projects.cta.live');
  const codeLabel = t('projects.cta.code');

  return (
    <section id="projects" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">{t('projects.title')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('projects.description')}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              title={t(project.titleKey)}
              description={t(project.descriptionKey)}
              liveLabel={liveLabel}
              codeLabel={codeLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
