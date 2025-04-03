import { z } from "zod";

export const AnswerSchema = z.object({
  id: z.number(),
  text: z.string(),
  questionId: z.number(),
  nextQuestionId: z.number().optional(),
});

export const QuestionSchema = z.object({
  id: z.number(),
  text: z.string(),
  category: z.string(),
  level: z.number(),
  answers: z.array(AnswerSchema),
});
