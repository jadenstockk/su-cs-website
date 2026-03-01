export interface Module {
  code: string;
  year: number;
  name: string;
  description: string;
  semester: "semester_1" | "semester_2" | "year";
  type: "undergraduate" | "postgraduate" | string;
  lecturer?: {
    name: string;
    link?: string;
  };
  infoLink?: string;
}
