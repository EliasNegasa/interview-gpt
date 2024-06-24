import { Exam } from '../types/exam';

const useExam = (exam: Exam | null) => {
  exam ? (exam.skills = Object.values(exam.skillsNames!).toString()) : '';

  const prompt = `Ask me ${exam?.topic} multiple-choice question one at a time, with a difficulty level of ${exam?.difficulty}, tailored for ${exam?.seniority} level, including skills such as ${exam?.skills}, and ask a maximum of ${exam?.maxQuestions} questions but one at a time.`;
  return { prompt };
};

export default useExam;
