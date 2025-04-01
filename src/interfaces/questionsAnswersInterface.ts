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

export interface UserAnswer {
  answerId: number;
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  paymentMethod: "online" | "in-person";
  answers: UserAnswer[];
}
