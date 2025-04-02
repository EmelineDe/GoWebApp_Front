<script setup lang="ts">
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { computed } from "vue";

defineProps<{
  isFormStep: boolean;
}>();

defineEmits<{
  (e: "next"): void;
}>();

const includedItems = [
  "Entre 150€ et 300€ TTC",
  "Gros matériel",
  "Déplacement",
  "Petites fournitures",
  "Nettoyage du chantier",
  "Main d’oeuvre",
];

const store = useQuestionnaireStore();

const recapSentence = computed(() => {
  const labels = store.answers
    .map(({ questionId, answerId }) => {
      const question = store.questions.find((q) => q.id === questionId);
      const answer = question?.answers.find((a) => a.id === answerId);
      return answer?.displayText?.trim();
    })
    .filter((label): label is string => !!label);

  if (labels.length === 0) return "Aucune information sélectionnée.";

  const baseSentence =
    labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(", ")}, ${labels.at(-1)}`;

  const capitalized =
    baseSentence.charAt(0).toUpperCase() + baseSentence.slice(1);

  return capitalized + ".";
});
</script>

<template>
  <div class="recap-wrapper">
    <v-card class="recap-card" flat>
      <h2 class="recap-title">{{ recapSentence }}</h2>

      <div v-if="isFormStep" class="vector-container">
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

      <ul class="recap-list">
        <li
          v-for="(item, index) in includedItems"
          :key="index"
          class="recap-item"
        >
          <svg
            v-if="index === 0"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1_355)">
              <path
                d="M15 8.5C15 6.64348 14.2625 4.86301 12.9497 3.55025C11.637 2.2375 9.85652 1.5 8 1.5C6.14348 1.5 4.36301 2.2375 3.05025 3.55025C1.7375 4.86301 1 6.64348 1 8.5C1 10.3565 1.7375 12.137 3.05025 13.4497C4.36301 14.7625 6.14348 15.5 8 15.5C9.85652 15.5 11.637 14.7625 12.9497 13.4497C14.2625 12.137 15 10.3565 15 8.5ZM0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5ZM4 9H4.75625C4.73438 8.84375 4.725 8.68437 4.725 8.525C4.725 8.34687 4.7375 8.17188 4.7625 8H4C3.725 8 3.5 7.775 3.5 7.5C3.5 7.225 3.725 7 4 7H5.06875C5.6375 5.81563 6.84687 5 8.24687 5H9.53125C9.80625 5 10.0312 5.225 10.0312 5.5C10.0312 5.775 9.80625 6 9.53125 6H8.24687C7.425 6 6.69688 6.39375 6.23438 7H9C9.275 7 9.5 7.225 9.5 7.5C9.5 7.775 9.275 8 9 8H5.77812C5.74375 8.16875 5.725 8.34375 5.725 8.525C5.725 8.6875 5.74063 8.84688 5.76875 9H9C9.275 9 9.5 9.225 9.5 9.5C9.5 9.775 9.275 10 9 10H6.2C6.65937 10.6344 7.40312 11.0469 8.24687 11.0469H9.53125C9.80625 11.0469 10.0312 11.2719 10.0312 11.5469C10.0312 11.8219 9.80625 12.0469 9.53125 12.0469H8.24687C6.82812 12.0469 5.60625 11.2094 5.04688 10H4C3.725 10 3.5 9.775 3.5 9.5C3.5 9.225 3.725 9 4 9Z"
                fill="#FF445F"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_355">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <svg
            v-else
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 15.6666C4.04667 15.6666 0.833336 12.4533 0.833336 8.49998C0.833336 4.54665 4.04667 1.33331 8 1.33331C11.9533 1.33331 15.1667 4.54665 15.1667 8.49998C15.1667 12.4533 11.9533 15.6666 8 15.6666ZM8 2.33331C4.6 2.33331 1.83334 5.09998 1.83334 8.49998C1.83334 11.9 4.6 14.6666 8 14.6666C11.4 14.6666 14.1667 11.9 14.1667 8.49998C14.1667 5.09998 11.4 2.33331 8 2.33331Z"
              fill="#FF445F"
            />
            <path
              d="M7.05334 10.8867C6.92 10.8867 6.79334 10.8333 6.7 10.74L4.81333 8.85334C4.62 8.66 4.62 8.34 4.81333 8.14667C5.00667 7.95334 5.32667 7.95334 5.52 8.14667L7.05334 9.68L10.48 6.25334C10.6733 6.06 10.9933 6.06 11.1867 6.25334C11.38 6.44667 11.38 6.76667 11.1867 6.96L7.40667 10.74C7.31334 10.8333 7.18667 10.8867 7.05334 10.8867Z"
              fill="#FF445F"
            />
          </svg>

          <span v-html="item"></span>
        </li>
      </ul>

      <v-btn class="intervention-btn" @click="$emit('next')" v-if="!isFormStep">
        Demander une intervention
      </v-btn>
    </v-card>
    <div v-if="isFormStep" class="recap-wrapper">
      <v-card class="recap-card assistance-centered" flat>
        <h3 class="assistance-title">Besoin d’une assistance téléphonique ?</h3>
        <v-btn class="intervention-btn">Afficher le numéro</v-btn>
      </v-card>
    </div>

    <!-- INFOS COMPLÉMENTAIRES -->
    <p v-if="!isFormStep" class="recap-info">
      <strong
        >Vous êtes recontactés sous 20 minutes après votre passage de
        commande.</strong
      ><br />
      Si l’origine de votre panne nécessite un diagnostic complémentaire, il
      s’agit d’une intervention à part entière demandant l’expertise d’un
      professionnel. Celle-ci fera l’objet d’une facturation.
    </p>

    <p v-else class="recap-info">
      <strong
        >Vous êtes recontactés sous 20 minutes après votre passage de
        commande.</strong
      ><br />
      Si l’origine de votre panne nécessite un diagnostic complémentaire, il
      s’agit d’une intervention à part entière demandant l’expertise d’un
      professionnel. Celle-ci fera l’objet d’une facturation. L'artisan vous
      proposera un rendez-vous dès qu'il aura pris connaissance de votre
      commande. Une fois sur place, il analysera la situation et vous présentera
      un devis définitif. En cas de non acceptation du devis, aucun frais n'est
      engagé (ni déplacement, ni établissement du devis).
    </p>
  </div>
</template>

<style scoped>
.recap-wrapper {
  width: 408px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.recap-card {
  background-color: #ffecef;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 4px 7px 18px 7px rgba(0, 0, 0, 0.05);
}

.recap-title {
  width: 350px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 135%;
  letter-spacing: -0.01em;
  color: #ff445f;
  margin-bottom: 24px;
}

.recap-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recap-list li {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 135%;
  letter-spacing: -0.01em;
  color: #443d3c;
  display: flex;
  align-items: center;
  gap: 10px;
}

.recap-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  line-height: 100%;
  color: #443d3c;
}

.assistance-title {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 135%;
  letter-spacing: -0.01em;
  color: #ff445f;
  margin-bottom: 24px;
  text-align: center;
}
.assistance-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intervention-btn {
  height: 53px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 43px;
  background-color: #ff445f;
  border: 1px solid #ff445f;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s ease;
}
.intervention-btn:hover {
  background-color: #8f0c30 !important;
  border: 1px solid #8f0c30;
}
.recap-info {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  color: #333;
  line-height: 1.4;
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
</style>
