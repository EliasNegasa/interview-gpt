interface Skill {
  [key: string]: string;
}

export interface Exam {
  id: string;
  topic: string;
  difficulty: string;
  seniority: string;
  maxDurationPerQuestion: number;
  maxQuestions: number;
  assistantType: string;
  skillsNames: Skill;
  skills?: string
}
