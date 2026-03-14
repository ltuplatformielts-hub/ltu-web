export type ExamType = "LISTENING" | "READING" | "WRITING" | "SPEAKING";
export type QuestionType = "INPUT" | "SELECT" | "AUDIO";
export interface ExamItem {
  id: string;
  name: string;
  img: string;
  createdAt: string;
}

export interface ExamItems {
  message: string;
  exam: ExamItem[];
  page: number;
  totalPage: number;
}

export interface CorrectAnswer {
  ans: string;
  name: string;
  score: 1;
}

export interface QuestionItem {
  name: string;
  type: QuestionType;
  correctAnswer: CorrectAnswer[];
}

export interface ExamItemDetails {
  id: string;
  name: string;
  img: string;
  type: ExamType;
  timeLimit: number;
  audio: string;
  picture: string[];
}

export interface SectionItem {
  section: string;
  questions: QuestionItem[];
}

export interface ExamItemOne {
  message: string;
  exam: ExamItemDetails;
  totalQuestion: number;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
}
