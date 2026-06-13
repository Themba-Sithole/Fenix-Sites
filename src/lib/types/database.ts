export type InquiryStatus = "new" | "read" | "replied" | "archived";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  budget: string | null;
  service: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export type InquiryInsert = Omit<Inquiry, "id" | "created_at" | "status"> & {
  status?: InquiryStatus;
};

export type ClientStatus = "lead" | "active" | "completed" | "inactive";

export type ProjectFilter =
  | "all"
  | "ecommerce"
  | "webapp"
  | "mobile"
  | "design";

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  tags: string[];
  client_id: string | null;
  duration: string | null;
  result: string | null;
  filter_category: ProjectFilter;
  featured: boolean;
  published: boolean;
  live_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  clients?: Pick<Client, "id" | "name" | "company"> | null;
}

export type ClientInsert = Omit<
  Client,
  "id" | "created_at" | "updated_at"
>;

export type ProjectInsert = Omit<
  Project,
  "id" | "created_at" | "updated_at" | "clients"
>;
