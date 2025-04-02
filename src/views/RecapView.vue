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
  <div class="recap-wrapper">
    <div class="recap-flex">
      <!-- Bloc gauche -->
      <div class="left-block">
        <GoodToKnow v-if="!isFormStep" />
        <UserForm v-else />
      </div>

      <!-- Bloc droite -->
      <div class="right-block">
        <RecapAnswers :isFormStep="isFormStep" @next="setFormStep(true)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.recap-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px 0;
}

.recap-flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 32px;
  max-width: 1200px;
  width: 100%;
}

/* Bloc gauche */
.left-block {
  flex: 1;
  max-width: 60%;
}

/* Bloc droite */
.right-block {
  flex: 1;
  max-width: 40%;
}

/* Responsive mobile */
@media screen and (max-width: 960px) {
  .recap-flex {
    flex-direction: column;
    align-items: center;
  }

  .left-block,
  .right-block {
    max-width: 100%;
  }

  .right-block {
    margin-top: 24px;
  }
}
</style>
