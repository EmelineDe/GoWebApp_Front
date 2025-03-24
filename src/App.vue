<script setup>
import Footer from "@/components/Footer.vue";
</script>

<template>
  <v-app>
    <v-main class="bg-background">
      <v-container>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
.bg-background {
  background-color: #443d3c !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
