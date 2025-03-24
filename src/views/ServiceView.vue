<script setup>
import { useRoute, useRouter } from "vue-router";
import { useServiceStore } from "@/stores/serviceStore";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const serviceStore = useServiceStore();

onMounted(() => {
  const serviceId = route.params.type;
  serviceStore.selectService(serviceId);

  if (!serviceStore.getSelectedService) {
    router.push({ name: "home" });
  }
});

const handleBack = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <v-container v-if="serviceStore.getSelectedService">
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" variant="text" @click="handleBack" class="mb-6">
          <v-icon start>mdi-arrow-left</v-icon>
          Retour
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h4 mb-4">
            {{ serviceStore.getSelectedService.title }}
          </v-card-title>
          <v-card-text>
            <p class="text-body-1">
              Contenu à venir pour le service
              {{ serviceStore.getSelectedService.title }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Les styles seront ajoutés ici */
</style>
