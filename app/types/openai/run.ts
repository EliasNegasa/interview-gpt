export interface Run {
  id: string;
  thread_id: string;
  status: 'completed' | 'in_progress' | 'requires_action' | 'failed';
}
