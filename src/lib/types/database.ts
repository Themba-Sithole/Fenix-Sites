export type UserRole = "super_admin" | "admin" | "editor" | "finance" | "viewer";

export interface UserSettings {
  email_notifications?: boolean;
  compact_sidebar?: boolean;
  agency_name?: string;
  agency_phone?: string;
  agency_email?: string;
  default_currency?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  settings?: UserSettings;
  created_at: string;
  updated_at: string;
}

export type FinanceType = "invoice" | "expense" | "payment";
export type FinanceStatus = "pending" | "paid" | "overdue" | "cancelled";

export interface FinanceRecord {
  id: string;
  title: string;
  type: FinanceType;
  amount: number;
  currency: string;
  status: FinanceStatus;
  client_id: string | null;
  project_id: string | null;
  due_date: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  clients?: Pick<Client, "id" | "name" | "company"> | null;
}

export type FinanceRecordInsert = Omit<
  FinanceRecord,
  "id" | "created_at" | "updated_at" | "clients" | "created_by"
>;

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  client_id: string | null;
  inquiry_id: string | null;
  subject: string | null;
  participant_name: string;
  participant_phone: string | null;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  body: string;
  is_outbound: boolean;
  created_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  url: string;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
}

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
