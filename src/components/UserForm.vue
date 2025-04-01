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

    // ✅ Affichage du message selon le mode de paiement
    if (user.value.paymentMethod === "Payer sur place") {
      alert(
        "Merci, votre demande a bien été enregistrée. Un professionnel vous contactera très prochainement pour organiser l’intervention."
      );
    } else {
      alert(
        "Vous allez être redirigé vers notre plateforme de paiement sécurisée pour finaliser votre demande."
      );
    }

    questionnaireStore.reset();
    router.push({ name: "Home" });
  } catch (error) {
    console.error("Erreur API :", error);
  }
};
</script>

<template>
  <v-card class="pa-6">
    <v-card-title class="mb-4 font-weight-bold">Informations</v-card-title>

    <v-form @submit.prevent="submitForm">
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.firstName"
            label="Prénom*"
            outlined
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
            outlined
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
            outlined
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
            outlined
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
            outlined
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
            outlined
            type="email"
            :error="isSubmitted && !!errors.email"
            :error-messages="isSubmitted ? errors.email : []"
            :color="user.email.includes('@') && !errors.email ? 'success' : ''"
          />
        </v-col>
      </v-row>

      <div class="mt-6">
        <h3 class="mb-3 font-weight-bold">Modes de paiement</h3>
        <v-radio-group v-model="user.paymentMethod">
          <v-radio
            v-for="option in paymentOptions"
            :key="option"
            :label="option"
            :value="option"
            color="primary"
          />
        </v-radio-group>
      </div>

      <div class="mt-4">
        <v-checkbox
          v-model="acceptTerms"
          color="primary"
          label="J'accepte les conditions générales"
        />
        <v-checkbox
          v-model="acceptRetraction"
          color="primary"
          label="J’ai lu le droit de rétractation"
        />
        <v-checkbox
          v-model="acceptCommercial"
          color="primary"
          label="Je souhaite recevoir des offres"
        />
      </div>

      <div class="d-flex justify-space-between align-center mt-6">
        <PreviousStepButton @click="setFormStep(false)" />

        <v-btn
          color="#FF445F"
          class="rounded-pill white--text"
          type="submit"
          elevation="0"
        >
          Passer commande
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>
.v-card-title {
  font-size: 1.5rem;
}

.rounded-pill {
  border-radius: 50px !important;
  text-transform: none !important;
  padding: 0 20px;
}

.white--text {
  color: white !important;
}
</style>
