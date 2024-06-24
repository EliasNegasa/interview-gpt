interface Enrollment {
  id: string;
  contactId: string;
  examId: string;
  uniqueIdentifier: string;
}

export interface EnrollmentResponse {
  total: number;
  list: Enrollment[];
}
