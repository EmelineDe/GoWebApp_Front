<script setup lang="ts">
import { useRouter } from "vue-router";
import { serviceCatalogStore } from "@/stores/serviceCatalogStore";
import type { Service } from "@/interfaces/serviceInterface";

const router = useRouter();
const serviceStore = serviceCatalogStore();

const handleServiceClick = (service: Service) => {
  if (!service.enabled) return;
  serviceStore.selectService(service.id);
  router.push({ name: "service", params: { type: service.id } });
};
</script>

<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="header-section">
        <h1 class="text-h3 font-weight-bold font-poppins">
          Mon problème concerne :
        </h1>
        <div class="vector-container">
          <svg
            width="80"
            height="17"
            viewBox="0 0 80 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M76.8328 0H76.9014C77.0096 0.0981252 77.0849 0.228182 77.1169 0.371994C77.5741 1.49794 78.0394 2.62057 78.4998 3.74485L79.886 7.14096C79.9278 7.22907 79.9601 7.32149 79.9823 7.41663C80.0215 7.61259 80.0052 7.64747 79.8191 7.72552C79.3668 7.91982 78.9129 8.10914 78.4606 8.30012L74.0523 10.1618C72.9638 10.6234 71.8753 11.0834 70.7869 11.5418L66.3655 13.4084L63.3221 14.6921C61.8526 15.3132 60.375 15.9326 58.9137 16.5637C58.7709 16.6298 58.6161 16.6648 58.4592 16.6665C58.3023 16.6683 58.1468 16.6366 58.0027 16.5737C55.9999 15.7267 53.996 14.8792 51.991 14.0312L48.0023 12.3472C46.3695 11.6597 44.7428 10.9722 43.1221 10.2846C42.1424 9.86781 41.1628 9.4543 40.1832 9.03747C40.1233 9.00911 40.0581 8.99442 39.9921 8.99442C39.9261 8.99442 39.8609 9.00911 39.8011 9.03747L35.6377 10.7945C34.6678 11.2041 33.698 11.6143 32.7282 12.025L28.5468 13.797L25.2536 15.1887C24.1744 15.6437 23.0951 16.0954 22.0192 16.5604C21.8772 16.628 21.7228 16.6643 21.566 16.6669C21.4093 16.6695 21.2538 16.6383 21.1097 16.5753C19.2778 15.8003 17.4465 15.0254 15.6156 14.2504C13.7848 13.4754 11.948 12.7004 10.1052 11.9254C8.51494 11.2611 6.92467 10.5891 5.3344 9.90933C3.67011 9.2063 2.00583 8.50494 0.341544 7.80523C0.217457 7.75209 0.0721448 7.7222 0.000305176 7.5827V7.54949C0.088472 7.02139 0.343176 6.55308 0.539103 6.06483C0.893403 5.17969 1.26076 4.29786 1.62486 3.40773C2.0657 2.33603 2.50381 1.26268 2.9392 0.187658C2.96745 0.105821 3.02605 0.0384699 3.10247 0L3.13349 0C3.66576 0.0946592 4.13598 0.357048 4.62743 0.562973C6.60792 1.39332 8.58514 2.23529 10.564 3.06895L14.156 4.58516C15.9966 5.36015 17.8372 6.13956 19.6778 6.92341C20.2379 7.16089 20.8012 7.39504 21.3612 7.63418C21.4185 7.66124 21.4809 7.67525 21.544 7.67525C21.6072 7.67525 21.6696 7.66124 21.7269 7.63418C22.835 7.16587 23.9425 6.69756 25.0495 6.22924C26.5614 5.58489 28.0831 4.95051 29.5852 4.31779C30.6737 3.85612 31.7621 3.39611 32.8506 2.93776L36.8998 1.21728L39.5513 0.0946592C39.6754 0.0415172 39.8142 0.0514813 39.9383 0H40.033C40.5652 0.0946592 41.0371 0.357048 41.5269 0.562973C43.5074 1.39332 45.4846 2.23529 47.4635 3.06895L51.4506 4.75455C53.2041 5.49411 54.9566 6.23533 56.7079 6.97821C57.2239 7.19964 57.7403 7.41829 58.2574 7.63418C58.3147 7.66124 58.3771 7.67525 58.4402 7.67525C58.5034 7.67525 58.5658 7.66124 58.6231 7.63418L61.9457 6.22924C63.4565 5.58822 64.9673 4.95107 66.4781 4.31779L69.7713 2.92613C71.1058 2.3615 72.4397 1.79686 73.7731 1.23223C74.6537 0.853594 75.5332 0.479385 76.4116 0.109605C76.5504 0.053142 76.6973 0.04816 76.8328 0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div class="services-grid">
        <v-tooltip
          v-for="service in serviceStore.getServices"
          :key="service.id"
          :disabled="service.enabled"
          location="top"
          text="Service non disponible pour le moment"
        >
          <template v-slot:activator="{ props }">
            <v-card
              width="180"
              height="180"
              class="service-card"
              v-bind="props"
              @click="handleServiceClick(service)"
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
          </template>
        </v-tooltip>
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
  background-color: #443d3c;
  color: #ffffff;
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
