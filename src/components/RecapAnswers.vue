<template>
  <v-card>
    <v-card-title>Récapitulatif</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(entry, index) in recap" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ entry.question }}</strong
              ><br />
              {{ entry.answer }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { computed } from "vue";

const store = useQuestionnaireStore();

const recap = computed(() =>
  store.answers.map(({ questionId, answerId }) => {
    const question = store.questions.find((q) => q.id === questionId);
    const answer = question?.answers.find((a) => a.id === answerId);
    return {
      question: question?.text || "Question inconnue",
      answer: answer?.displayText || "Réponse inconnue",
    };
  })
);
</script>
