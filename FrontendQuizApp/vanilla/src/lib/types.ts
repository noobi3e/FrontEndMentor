export interface OPTIONS {
  title: string
  isCorrect: boolean
}

export interface Questions {
  id: number
  ques: string
  options: OPTIONS[]
}
