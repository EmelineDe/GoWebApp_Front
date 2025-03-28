<script setup lang="ts">
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");

function submitForm() {
  console.log("Formulaire utilisateur :", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
  });

  // TODO : envoyer les données au backend
}
</script>

<template>
  <v-card>
    <v-card-title>Formulaire utilisateur</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="firstName" label="Prénom" required />
        <v-text-field v-model="lastName" label="Nom" required />
        <v-text-field v-model="email" label="Email" type="email" required />
        <v-text-field v-model="phone" label="Téléphone" type="tel" />

        <v-btn color="primary" type="submit" class="mt-4"> Envoyer </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
