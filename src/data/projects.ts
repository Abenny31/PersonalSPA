export type Project = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'net-api-react',
    titleKey: 'projects.items.netApiReact.title',
    descriptionKey: 'projects.items.netApiReact.description',
    sourceUrl: 'https://github.com/Abenny31/VranjicReact'
  },
  {
    id: 'net-api',
    titleKey: 'projects.items.netAPI.title',
    descriptionKey: 'projects.items.netAPI.description',
    sourceUrl: 'https://github.com/Abenny31/LaunchData'
  },
  {
    id: 'contact-manager',
    titleKey: 'projects.items.contactManager.title',
    descriptionKey: 'projects.items.contactManager.description',
    sourceUrl: 'https://github.com/Abenny31/ContactManager'
  }
];
