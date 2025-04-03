<script setup>
/**
 * Composant racine de l'application qui gère l'affichage de l'en-tête, du pied de page,
 * et des transitions entre les vues de route.
 */

import Footer from "@/components/Footer.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <v-app>
    <AppHeader v-if="$route.name !== 'Home'" />
    <v-main class="main">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.main {
  padding-bottom: 5rem !important;
}
</style>
