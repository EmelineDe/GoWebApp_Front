<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { serviceCatalogStore } from "@/stores/serviceCatalogStore";
import { useQuestionnaire } from "@/composable/useQuestionnaireComposable";
import QuestionCard from "@/components/QuestionsCard.vue";

const route = useRoute();
const router = useRouter();
const serviceStore = serviceCatalogStore();
const { store, start, selectAnswer, goBack } = useQuestionnaire();

onMounted(async () => {
  const serviceId = route.params.type as string;
  serviceStore.selectService(serviceId);
  if (!serviceStore.getSelectedService) return router.push({ name: "Home" });
  await start(serviceId);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          variant="outlined"
          color="error"
          prepend-icon="mdi-arrow-left"
          @click="goBack"
        >
          Étape précédente
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="!store.loading && !store.isFinished">
      <v-col cols="12">
        <QuestionCard
          v-if="store.currentQuestion"
          :question="store.currentQuestion"
          @select="selectAnswer"
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>
