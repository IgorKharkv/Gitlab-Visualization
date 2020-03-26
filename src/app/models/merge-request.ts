import {User} from './user';

export interface MergeRequest {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  target_branch: string;
  source_branch: string;
  upvotes: number;
  downvotes: number;
  author: User;
  work_in_progress: boolean;
  web_url: string;
  amountOfResolvableDiscussions: number;
  amountOfResolvableDiscussionsResolved: number;
}
