<template>
  <v-row>
    <v-col cols="12"> </v-col>
  </v-row>
  <div class="question-card">
    <h2 class="question-title">
      {{ capitalize(question.text) }}
    </h2>

    <div class="vector-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="17"
        viewBox="0 0 80 17"
        fill="currentColor"
        class="vector-icon"
      >
        <path
          d="M76.8328 0H76.9014C77.0096 0.0981252 77.0849 0.228182 77.1169 0.371994C77.5741 1.49794 78.0394 2.62057 78.4998 3.74485L79.886 7.14096C79.9278 7.22907 79.9601 7.32149 79.9823 7.41663C80.0215 7.61259 80.0052 7.64747 79.8191 7.72552C79.3668 7.91982 78.9129 8.10914 78.4606 8.30012L74.0523 10.1618C72.9638 10.6234 71.8753 11.0834 70.7869 11.5418L66.3655 13.4084L63.3221 14.6921C61.8526 15.3132 60.375 15.9326 58.9137 16.5637C58.7709 16.6298 58.6161 16.6648 58.4592 16.6665C58.3023 16.6683 58.1468 16.6366 58.0027 16.5737C55.9999 15.7267 53.996 14.8792 51.991 14.0312L48.0023 12.3472C46.3695 11.6597 44.7428 10.9722 43.1221 10.2846C42.1424 9.86781 41.1628 9.4543 40.1832 9.03747C40.1233 9.00911 40.0581 8.99442 39.9921 8.99442C39.9261 8.99442 39.8609 9.00911 39.8011 9.03747L35.6377 10.7945C34.6678 11.2041 33.698 11.6143 32.7282 12.025L28.5468 13.797L25.2536 15.1887C24.1744 15.6437 23.0951 16.0954 22.0192 16.5604C21.8772 16.628 21.7228 16.6643 21.566 16.6669C21.4093 16.6695 21.2538 16.6383 21.1097 16.5753C19.2778 15.8003 17.4465 15.0254 15.6156 14.2504C13.7848 13.4754 11.948 12.7004 10.1052 11.9254C8.51494 11.2611 6.92467 10.5891 5.3344 9.90933C3.67011 9.2063 2.00583 8.50494 0.341544 7.80523C0.217457 7.75209 0.0721448 7.7222 0.000305176 7.5827V7.54949C0.088472 7.02139 0.343176 6.55308 0.539103 6.06483C0.893403 5.17969 1.26076 4.29786 1.62486 3.40773C2.0657 2.33603 2.50381 1.26268 2.9392 0.187658C2.96745 0.105821 3.02605 0.0384699 3.10247 0L3.13349 0C3.66576 0.0946592 4.13598 0.357048 4.62743 0.562973C6.60792 1.39332 8.58514 2.23529 10.564 3.06895L14.156 4.58516C15.9966 5.36015 17.8372 6.13956 19.6778 6.92341C20.2379 7.16089 20.8012 7.39504 21.3612 7.63418C21.4185 7.66124 21.4809 7.67525 21.544 7.67525C21.6072 7.67525 21.6696 7.66124 21.7269 7.63418C22.835 7.16587 23.9425 6.69756 25.0495 6.22924C26.5614 5.58489 28.0831 4.95051 29.5852 4.31779C30.6737 3.85612 31.7621 3.39611 32.8506 2.93776L36.8998 1.21728L39.5513 0.0946592C39.6754 0.0415172 39.8142 0.0514813 39.9383 0H40.033C40.5652 0.0946592 41.0371 0.357048 41.5269 0.562973C43.5074 1.39332 45.4846 2.23529 47.4635 3.06895L51.4506 4.75455C53.2041 5.49411 54.9566 6.23533 56.7079 6.97821C57.2239 7.19964 57.7403 7.41829 58.2574 7.63418C58.3147 7.66124 58.3771 7.67525 58.4402 7.67525C58.5034 7.67525 58.5658 7.66124 58.6231 7.63418L61.9457 6.22924C63.4565 5.58822 64.9673 4.95107 66.4781 4.31779L69.7713 2.92613C71.1058 2.3615 72.4397 1.79686 73.7731 1.23223C74.6537 0.853594 75.5332 0.479385 76.4116 0.109605C76.5504 0.053142 76.6973 0.04816 76.8328 0Z"
          fill="curentColor"
        />
      </svg>
    </div>

    <div class="answers-grid">
      <div
        v-for="answer in question.answers"
        :key="answer.id"
        class="answer-item"
      >
        <v-btn
          block
          variant="flat"
          class="answer-button justify-space-between"
          @click="$emit('select', answer)"
        >
          <span class="answer-label text-none">
            {{ capitalize(answer.displayText) }}
          </span>
          <img
            src="../assets/icons/arrow-right.svg"
            alt="arrow icon"
            class="arrow-icon"
          />
        </v-btn>
      </div>
    </div>
    <PreviousStepButton @click="goBack" />
  </div>
  <!-- SECTION INFO -->
  <v-row>
    <v-col cols="12">
      <div class="info-wrapper">
        <div class="info-box">
          <ul class="info-list">
            <li>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M11.08 16.2471C10.88 16.2471 10.69 16.1671 10.55 16.0271L7.72 13.1971C7.43 12.9071 7.43 12.4271 7.72 12.1371C8.01 11.8471 8.49 11.8471 8.78 12.1371L11.08 14.4371L16.22 9.29705C16.51 9.00705 16.99 9.00705 17.28 9.29705C17.57 9.58705 17.57 10.0671 17.28 10.3571L11.61 16.0271C11.47 16.1671 11.28 16.2471 11.08 16.2471Z"
                  fill="#008670"
                />
              </svg>
              <span>
                Plus de <strong>1500 professionnels qualifiés</strong>, recrutés
                selon des critères et un processus stricts
              </span>
            </li>

            <li>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M11.08 16.2471C10.88 16.2471 10.69 16.1671 10.55 16.0271L7.72 13.1971C7.43 12.9071 7.43 12.4271 7.72 12.1371C8.01 11.8471 8.49 11.8471 8.78 12.1371L11.08 14.4371L16.22 9.29705C16.51 9.00705 16.99 9.00705 17.28 9.29705C17.57 9.58705 17.57 10.0671 17.28 10.3571L11.61 16.0271C11.47 16.1671 11.28 16.2471 11.08 16.2471Z"
                  fill="#008670"
                />
              </svg>
              <span>
                Fourchette tarifaire <strong>connue à l’avance</strong>,
                incluant le déplacement ainsi qu’un devis gratuit
              </span>
            </li>

            <li>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M11.08 16.2471C10.88 16.2471 10.69 16.1671 10.55 16.0271L7.72 13.1971C7.43 12.9071 7.43 12.4271 7.72 12.1371C8.01 11.8471 8.49 11.8471 8.78 12.1371L11.08 14.4371L16.22 9.29705C16.51 9.00705 16.99 9.00705 17.28 9.29705C17.57 9.58705 17.57 10.0671 17.28 10.3571L11.61 16.0271C11.47 16.1671 11.28 16.2471 11.08 16.2471Z"
                  fill="#008670"
                />
              </svg>
              <span>
                Intervention <strong>7j/7 24h/24</strong> pour les dépannages
                d’urgence
              </span>
            </li>
          </ul>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Question, Answer } from "../interfaces/questionsAnswersInterface";
import { useQuestionnaire } from "@/composable/useQuestionnaireComposable";
import { capitalize } from "../utils/formatText";
import PreviousStepButton from "@/components/PreviousStepButton.vue";

const { goBack } = useQuestionnaire();

defineProps<{ question: Question }>();
defineEmits<{ (e: "select", answer: Answer): void }>();
</script>

<style scoped>
.question-card {
  max-width: 1066px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 32px 38px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  box-shadow: 4px 7px 18px 7px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-title {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 34px;
  color: #000000;
  line-height: 100%;
  margin-bottom: 1.5rem;
  text-align: center;
}

.vector-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.vector-icon {
  width: 80px;
  height: auto;
  color: #ff445f;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 16px;
  padding: 10px;
  width: 893px;
  margin: 0 auto 2rem;
}

.answer-item {
  display: flex;
  justify-content: center;
}

.answer-button {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 423px;
  height: auto;
  padding: 30px 16px !important;
  border-radius: 10px;
  font-weight: 600;
  color: #333;
  background-color: #f2f2f2 !important;
  transition: background-color 0.2s, color 0.2s;
}
.answer-button:hover {
  background-color: #fff0f1 !important;
  color: #ff445f !important;
}

.answer-label {
  flex: 1;
  text-align: left;
}

.justify-space-between :deep(.v-btn__content) {
  justify-content: space-between !important;
  width: 100%;
}

.info-wrapper {
  max-width: 1066px;
  margin: 0 auto;
}

.info-box {
  background-color: #defae9;
  border-radius: 10px;
  padding: 32px 38px;
}

.info-list {
  list-style: none;
  margin: 0;
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  line-height: 100%;
  font-weight: 400;
  color: #443d3c;
}
.info-list li strong {
  font-weight: 600;
}
</style>
