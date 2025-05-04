import { Question } from './question.model';

export interface Topic {
  id: string;
  name: string;
  emphasis: string;
  createdAt: Date;
  lastScore?: number;
  feedback?: string;
  lastDate?: Date;
  questions: Question[];
}
