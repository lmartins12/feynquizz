export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  FINAL = 'final',
}

export interface Question {
  id: string;
  topicId: string;
  text: string;
  difficulty: QuestionDifficulty;
  userAnswer?: string;
}
