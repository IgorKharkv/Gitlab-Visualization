import {User} from './user';

export interface Emoji {
  id: number;
  name: string;
  user: User;
  created_at: string;
  updated_at: string;
  awardable_id: number;
}
