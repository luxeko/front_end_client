import { User } from '@/types/user';

export type Comment = {
  id: string;
  parent_id?: string;
  user_id: string;
  product_id?: string;
  content: string;
  depth: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  user: User;
  replies: Comment[];
};
