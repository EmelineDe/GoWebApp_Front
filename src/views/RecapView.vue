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
  setFormStep(false);
  window.addEventListener("popstate", handlePopState);
});

onBeforeUnmount(() => {
  window.removeEventListener("popstate", handlePopState);
});
</script>

<template>
  <v-container class="recap-container" fluid>
    <v-row class="recap-row" no-gutters>
      <!-- Colonne gauche -->
      <v-col cols="12" md="5" offset-md="2" class="left-col">
        <GoodToKnow v-if="!isFormStep" />
        <UserForm v-else />
      </v-col>

      <!-- Colonne droite -->
      <v-col cols="12" md="4" class="right-col">
        <RecapAnswers :isFormStep="isFormStep" @next="setFormStep(true)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.recap-container {
  margin: 40px auto 0;
  padding: 10px;
}

/* Colonne gauche */
.left-col {
  max-width: 50%;
}

/* Colonne droite */
.right-col {
  max-width: 50%;
  margin-left: 2rem;
}
</style>
