export interface Option {
  text: string;
  code: string;
}

export interface Question {
  question: string;
  code?: string;
  additional_text: string;
  options: Option[];
  response_type: string;
}
