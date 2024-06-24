import { create } from 'zustand';
import { Exam } from '../types/exam';

interface State {
  exam: Exam | null;
}

interface Action {
  setExam: (exam: Exam) => void;
}

const useExamStore = create<State & Action>((set) => ({
  exam: null,
  setExam: (exam: Exam) => set(() => ({ exam })),
}));

export default useExamStore;
