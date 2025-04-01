<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { useUserForm } from "@/composable/userFormComposable";
import { useRecapStep } from "@/composable/useRecapStep";
import { useRouter } from "vue-router";
import PreviousStepButton from "@/components/PreviousStepButton.vue";

const router = useRouter();
const userStore = useUserStore();
const questionnaireStore = useQuestionnaireStore();
const { setFormStep } = useRecapStep();

const {
  user,
  acceptTerms,
  acceptRetraction,
  acceptCommercial,
  paymentOptions,
  validateUser,
  getUserPayload,
  errors,
  isSubmitted,
} = useUserForm();

const submitForm = async () => {
  isSubmitted.value = true;

  if (!acceptTerms.value || !acceptRetraction.value) {
    alert(
      "Vous devez accepter les conditions générales et le droit de rétractation."
    );
    return;
  }

  if (!user.value.paymentMethod) {
    alert("Veuillez sélectionner un mode de paiement.");
    return;
  }

  const result = validateUser();
  if (!result.success) return;

  try {
    const userPayload = getUserPayload();
    const { answers, ...userData } = userPayload;

    const createdUser = await userStore.createUser(userData);
    await userStore.submitUserAnswers({ userId: createdUser.id, answers });

    alert(
      user.value.paymentMethod === "Payer sur place"
        ? "Merci, votre demande a bien été enregistrée. Un professionnel vous contactera très prochainement pour organiser l’intervention."
        : "Vous allez être redirigé vers notre plateforme de paiement sécurisée pour finaliser votre demande."
    );
    setTimeout(() => {
      questionnaireStore.reset();
      router.push({ name: "Home" });
    }, 200);
  } catch (error) {
    console.error("Erreur API :", error);
  }
};
</script>

<template>
  <v-card class="pa-6 user-form-card">
    <div class="section-title">
      <span class="badge">1</span>
      <h2 class="title-text">Informations</h2>
    </div>

    <v-form @submit.prevent="submitForm">
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.firstName"
            label="Prénom*"
            variant="outlined"
            :error="isSubmitted && !!errors.firstName"
            :error-messages="isSubmitted ? errors.firstName : []"
            :color="
              user.firstName.length >= 2 && !errors.firstName ? 'success' : ''
            "
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.lastName"
            label="Nom*"
            variant="outlined"
            :error="isSubmitted && !!errors.lastName"
            :error-messages="isSubmitted ? errors.lastName : []"
            :color="
              user.lastName.length >= 2 && !errors.lastName ? 'success' : ''
            "
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.address"
            label="Adresse*"
            variant="outlined"
            :error="isSubmitted && !!errors.address"
            :error-messages="isSubmitted ? errors.address : []"
            :color="
              user.address.length >= 5 && !errors.address ? 'success' : ''
            "
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.zipCode"
            label="Code postal*"
            variant="outlined"
            :error="isSubmitted && !!errors.zipCode"
            :error-messages="isSubmitted ? errors.zipCode : []"
            :color="
              user.zipCode.length === 5 && !errors.zipCode ? 'success' : ''
            "
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.phoneNumber"
            label="Téléphone*"
            variant="outlined"
            type="tel"
            :error="isSubmitted && !!errors.phoneNumber"
            :error-messages="isSubmitted ? errors.phoneNumber : []"
            :color="
              user.phoneNumber.length >= 10 && !errors.phoneNumber
                ? 'success'
                : ''
            "
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.email"
            label="Email*"
            variant="outlined"
            type="email"
            :error="isSubmitted && !!errors.email"
            :error-messages="isSubmitted ? errors.email : []"
            :color="user.email.includes('@') && !errors.email ? 'success' : ''"
          />
        </v-col>
      </v-row>

      <div class="mt-6">
        <div class="section-title">
          <span class="badge">2</span>
          <h2 class="title-text">Modes de paiement</h2>
        </div>

        <div class="payment-checkbox-group">
          <div
            v-for="option in paymentOptions"
            :key="option"
            class="payment-option"
            @click="user.paymentMethod = option"
          >
            <span>{{ option }}</span>
            <v-checkbox
              :model-value="user.paymentMethod === option"
              hide-details
              readonly
              class="custom-checkbox"
              color="primary"
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
        <v-checkbox
          class="custom-conditions"
          v-model="acceptTerms"
          color="primary"
          hide-details
        >
          <template #label>
            J'accepte les&nbsp;
            <span class="highlighted"
              >conditions générales d'utilisation du service</span
            >
          </template>
        </v-checkbox>

        <v-checkbox
          class="custom-conditions"
          v-model="acceptRetraction"
          color="primary"
          hide-details
        >
          <template #label>
            J’ai bien pris connaissance des&nbsp;
            <span class="highlighted"
              >dispositions relatives au droit de rétractation</span
            >
          </template>
        </v-checkbox>

        <v-checkbox
          class="custom-conditions"
          v-model="acceptCommercial"
          label="Je souhaite recevoir par voie électronique des offres commerciales personnalisées"
          color="primary"
          hide-details
        />
      </div>

      <div class="d-flex justify-space-between align-center mt-6">
        <PreviousStepButton @click="setFormStep(false)" />
        <v-btn
          color="#FF445F"
          class="command-button text-none"
          type="submit"
          elevation="0"
        >
          Passer commande et payer en ligne
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>
.user-form-card {
  width: 685px;
  min-height: 805px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 4px 7px 18px 7px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.badge {
  background-color: #ff445f;
  color: white;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-text {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #443d3c;
  margin: 0;
  line-height: 135%;
}

.payment-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-option {
  height: 47px;
  background-color: #f2f2f2;
  padding: 13px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  color: #443d3c;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
}

.custom-conditions .v-label {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #443d3c;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: normal;
  word-break: break-word;
  max-width: 100%;
}
::v-deep(.custom-conditions .v-label) {
  white-space: nowrap !important;
  word-break: normal !important;
}

.highlighted {
  color: #1976d2;
  white-space: nowrap;
}

.command-button {
  border-radius: 43px;
  padding: 28px 46px;
  border: 1px solid #ff445f;
  background-color: #ff445f;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.command-button:hover {
  background-color: #8f0c30 !important;
  border: 1px solid #8f0c30;
}
</style>
