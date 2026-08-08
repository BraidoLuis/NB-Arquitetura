export type Project = {
  id?: string;
  slug: string;
  type: string;
  title: string;
  subtitle?: string | null;
  place: string;
  images: string[];
  position: string;
  summary: string;
  text: string;
  published?: boolean;
  featured?: boolean;
  in_progress?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
};
