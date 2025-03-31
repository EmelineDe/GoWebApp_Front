<script setup lang="ts">
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { computed } from "vue";

defineProps<{
  isFormStep: boolean;
}>();

defineEmits<{
  (e: "next"): void;
}>();

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

<template>
  <v-card>
    <v-card-title>Récapitulatif</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(entry, index) in recap" :key="index">
          <v-list-item-title>
            <strong>{{ entry.question }}</strong
            ><br />
            {{ entry.answer }}
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- BOUTON -->
      <div class="mt-4">
        <v-btn v-if="!isFormStep" color="primary" block @click="$emit('next')">
          Demander une intervention
        </v-btn>

        <v-alert v-else type="info" border="start" color="pink-lighten-4">
          Besoin d’une assistance téléphonique ?<br />
          <v-btn color="primary" class="mt-2">Afficher le numéro</v-btn>
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>
