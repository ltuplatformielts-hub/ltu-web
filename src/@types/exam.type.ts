export type ExamType = "LISTENING" | "READING" | "WRITING" | "SPEAKING"

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
