export interface Project {
  id: string;
  title: string;
  titleVi?: string;
  description: string;
  descriptionVi?: string;
  fullDescription: string;
  fullDescriptionVi?: string;
  image: string;
  tags: string[];
  techStack:string[];
  features?: string[];
  featuresVi?: string[];
  demo?: string;
  github?: string;
  githubFe?: string;
  githubBe?: string;
  type?: "Fullstack" | "Frontend" | "Backend" |"Extension"

}
