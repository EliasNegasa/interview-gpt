import { Feedback } from './feedback';
import { Question } from './question';

export type Message =
  | { type: 'question'; data: Question }
  | { type: 'feedback'; data: Feedback }
  | null;
