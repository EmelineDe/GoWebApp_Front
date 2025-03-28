<template>
  <div class="question-wrapper">
    <h2 class="question-title">
      {{ capitalize(question.text) }}
    </h2>

    <div class="divider">
      <img src="/src/assets/icons/vector.svg" alt="décoratif" />
    </div>

    <v-row class="answers-grid" dense>
      <v-col
        v-for="answer in question.answers"
        :key="answer.id"
        cols="12"
        sm="6"
        class="answer-item"
      >
        <v-btn
          block
          variant="flat"
          color="#F8F8F8"
          class="answer-button"
          @click="$emit('select', answer)"
        >
          <div class="text-start">{{ capitalize(answer.displayText) }}</div>
          <v-icon end color="primary">mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Question, Answer } from "../interfaces/questionsAnswersInterface";
import { capitalize } from "../utils/formatText";
defineProps<{
  question: Question;
}>();

defineEmits<{
  (e: "select", answer: Answer): void;
}>();
</script>

<style scoped>
.question-wrapper {
  text-align: center;
  margin-bottom: 2rem;
}

.question-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
}

.divider img {
  width: 50px;
  margin-bottom: 2rem;
}

.answers-grid {
  justify-content: center;
  gap: 16px;
}

.answer-button {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: #333;
  transition: background-color 0.2s;
}

.answer-button:hover {
  background-color: #ffebee;
}
</style>
