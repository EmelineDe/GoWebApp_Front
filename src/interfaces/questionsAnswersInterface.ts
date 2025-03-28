export interface Question {
  id: number;
  text: string;
  category: string;
  level: number;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  displayText: string;
  questionId: number;
  nextQuestionId?: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  paymentMethod: string;
  answers: UserAnswer[];
}

export interface UserAnswer {
  id: number;
  user: User;
  answer: Answer;
}
