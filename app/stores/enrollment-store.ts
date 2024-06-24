import { create } from 'zustand';

interface State {
  examId: string;
}

interface Action {
  setExamId: (id: string) => void;
}

const useEnrollmentStore = create<State & Action>((set) => ({
  examId: '',
  setExamId: (id) => set(() => ({ examId: id })),
}));

export default useEnrollmentStore;
