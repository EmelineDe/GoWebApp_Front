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

const recapSentence = computed(() => {
  const labels = store.answers
    .map(({ questionId, answerId }) => {
      const question = store.questions.find((q) => q.id === questionId);
      const answer = question?.answers.find((a) => a.id === answerId);
      return answer?.displayText?.trim();
    })
    .filter((label): label is string => !!label); // on garde uniquement les strings valides

  if (labels.length === 0) return "Aucune information sélectionnée.";

  const baseSentence =
    labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(", ")} et ${labels.at(-1)}`;

  const capitalized =
    baseSentence.charAt(0).toUpperCase() + baseSentence.slice(1);

  return capitalized + ".";
});
</script>

<template>
  <div class="recap-wrapper">
    <v-card class="recap-card" flat>
      <h2 class="recap-title">{{ recapSentence }}</h2>

      <ul class="recap-list">
        <li>Entre 150€ et 300€ TTC</li>
        <li>Gros matériel</li>
        <li>Déplacement</li>
        <li>Petites fournitures</li>
        <li>Nettoyage du chantier</li>
        <li>Main d’oeuvre</li>
      </ul>

      <v-btn class="intervention-btn" @click="$emit('next')" v-if="!isFormStep">
        Demander une intervention
      </v-btn>

      <v-alert
        v-else
        type="info"
        border="start"
        color="pink-lighten-4"
        class="mt-4"
      >
        Besoin d’une assistance téléphonique ?<br />
        <v-btn color="primary" class="mt-2">Afficher le numéro</v-btn>
      </v-alert>
    </v-card>

    <!-- INFOS COMPLÉMENTAIRES -->
    <p class="recap-info">
      <strong
        >Vous êtes recontactés sous 20 minutes après votre passage de
        commande.</strong
      ><br />
      Si l’origine de votre panne nécessite un diagnostic complémentaire, il
      s’agit d’une intervention à part entière demandant l’expertise d’un
      professionnel. Celle-ci fera l’objet d’une facturation.
    </p>
  </div>
</template>

<style scoped>
.recap-wrapper {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.recap-card {
  background-color: #ffecef;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 4px 7px 18px 7px rgba(0, 0, 0, 0.05);
}

.recap-title {
  width: 350px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 135%;
  letter-spacing: -0.01em;
  color: #ff445f;
  margin-bottom: 24px;
}

.recap-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recap-list li::before {
  content: "✔";
  margin-right: 10px;
  color: #e62459;
}

.intervention-btn {
  background-color: #ff445f;
  color: white;
  border-radius: 32px;
  padding: 14px 24px;
  font-weight: 600;
  font-size: 14px;
  text-transform: none;
  width: 100%;
}

.recap-info {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  color: #333;
  line-height: 1.4;
}
</style>
