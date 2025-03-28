<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <RecapAnswers />
      </v-col>
      <v-col cols="12" md="6">
        <UserForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import RecapAnswers from "@/components/RecapAnswers.vue";
import UserForm from "@/components/UserForm.vue";
</script>
