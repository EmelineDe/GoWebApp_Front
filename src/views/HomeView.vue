<script setup>
import { useRouter } from "vue-router";
import { serviceCatalogStore } from "@/stores/serviceCatalogStore";

const router = useRouter();
const serviceStore = serviceCatalogStore();

const handleServiceClick = (serviceId) => {
  serviceStore.selectService(serviceId);
  router.push({ name: "service", params: { type: serviceId } });
};
</script>

<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- Titre et vague -->
      <div class="header-section">
        <h1 class="text-h3 font-weight-bold font-poppins">
          Mon problème concerne :
        </h1>
        <div class="vector-container">
          <img
            src="/src/assets/icons/vector.svg"
            alt="decorative wave"
            class="vector-image"
          />
        </div>
      </div>

      <!-- Grille de services -->
      <div class="services-grid">
        <v-card
          v-for="service in serviceStore.getServices"
          :key="service.id"
          width="180"
          height="180"
          class="service-card"
          @click="() => handleServiceClick(service.id)"
        >
          <v-card-item class="card-content">
            <div class="icon-container">
              <img
                :src="service.icon"
                :alt="service.title"
                class="service-icon"
              />
            </div>
            <div class="title-container">
              <div class="card-title">
                {{ service.title }}
              </div>
            </div>
          </v-card-item>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content-wrapper {
  width: 1066px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 180px);
  gap: 24px;
  justify-content: center;
}

.service-card {
  transition: background-color 0.2s ease-in-out;
  background-color: #fff0f1 !important;
  border-radius: 10px !important;
  padding: 0 !important;
  box-shadow: 4px 7px 18px 7px rgba(0, 0, 0, 0.05) !important;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.service-card:hover {
  background-color: #ff445f !important;
}

.service-card:hover .service-icon {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(93deg) brightness(103%) contrast(103%);
}

.service-card:hover .title-container {
  background-color: #ffffff;
}

.service-card:hover .card-title {
  color: #ff445f;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 !important;
}

.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.service-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(45%) sepia(83%) saturate(2074%)
    hue-rotate(323deg) brightness(99%) contrast(102%);
}

.title-container {
  background-color: #ff445f;
  width: 100%;
  padding: 6px 15px;
  margin-bottom: 1rem;
}

.card-title {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #ffffff;
  text-align: center;
}

.vector-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.vector-image {
  width: 100px;
  height: auto;
}

.font-poppins {
  font-family: "Poppins", sans-serif !important;
  font-weight: 700 !important;
  line-height: 100% !important;
  letter-spacing: 0% !important;
}

/* Mobile first - ajustements pour les différentes tailles d'écran */
@media (max-width: 600px) {
  .content-wrapper {
    width: 100%;
    padding: 16px;
  }

  .services-grid {
    grid-template-columns: repeat(2, 180px);
    gap: 24px;
  }

  .text-h3 {
    font-size: 1.75rem !important;
  }

  .vector-image {
    width: 80px;
  }
}

@media (min-width: 601px) and (max-width: 959px) {
  .content-wrapper {
    width: 100%;
    padding: 24px;
  }

  .services-grid {
    grid-template-columns: repeat(3, 180px);
    gap: 24px;
  }
}
</style>
