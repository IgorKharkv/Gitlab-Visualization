import {Note} from './note';

export interface Discussion {
  id: string;
  individual_note: boolean;
  notes: Note[];
}
