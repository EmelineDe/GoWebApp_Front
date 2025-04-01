<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import RecapAnswers from "@/components/RecapAnswers.vue";
import UserForm from "@/components/UserForm.vue";
import GoodToKnow from "@/components/GoodToKnow.vue";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { useRecapStep } from "@/composable/useRecapStep";

const router = useRouter();
const store = useQuestionnaireStore();
const { isFormStep, setFormStep } = useRecapStep();

function handlePopState() {
  const confirmLeave = window.confirm(
    "Voulez-vous vraiment recommencer le questionnaire ?"
  );
  if (confirmLeave) {
    store.reset();
    router.replace({ name: "Home" });
  } else {
    history.pushState(null, "", location.href);
  }
}

onBeforeMount(() => {
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", handlePopState);
});

onBeforeUnmount(() => {
  window.removeEventListener("popstate", handlePopState);
});
</script>

<template>
  <v-container>
    <v-row>
      <!-- Colonne gauche -->
      <v-col cols="12" md="6">
        <GoodToKnow v-if="!isFormStep" />
        <template v-else>
          <UserForm />
        </template>
      </v-col>

      <!-- Colonne droite -->
      <v-col cols="12" md="6">
        <RecapAnswers :isFormStep="isFormStep" @next="setFormStep(true)" />
      </v-col>
    </v-row>
  </v-container>
</template>
