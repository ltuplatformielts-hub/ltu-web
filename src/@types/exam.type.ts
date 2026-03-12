export interface ExamItem {
id: string,
name: string,
createdAt: string
}

export interface ExamItems {
  message: string,
  exam: ExamItem[]
}