<template>
  <div class="back-button-container">
    <v-btn
      class="text-none previous-step-btn"
      variant="outlined"
      color="error"
      @click="$emit('click')"
    >
      <template #prepend>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="previous-icon"
        >
          <path
            d="M12.5 1.91706C18.43 1.91706 23.25 6.73706 23.25 12.6671C23.25 18.5971 18.43 23.4171 12.5 23.4171C6.57 23.4171 1.75 18.5971 1.75 12.6671C1.75 6.73705 6.57 1.91706 12.5 1.91706ZM12.5 21.9171C17.6 21.9171 21.75 17.7671 21.75 12.6671C21.75 7.56706 17.6 3.41706 12.5 3.41706C7.4 3.41706 3.25 7.56705 3.25 12.6671C3.25 17.7671 7.4 21.9171 12.5 21.9171Z"
            fill="#FF445F"
          />
          <path
            d="M10 11.9171L16 11.9171C16.41 11.9171 16.75 12.2571 16.75 12.6671C16.75 13.0771 16.41 13.4171 16 13.4171L10 13.4171C9.59 13.4171 9.25 13.0771 9.25 12.6671C9.25 12.2571 9.59 11.9171 10 11.9171Z"
            fill="#FF445F"
          />
          <path
            d="M12 8.91705C12.19 8.91705 12.38 8.98705 12.53 9.13705C12.82 9.42705 12.82 9.90705 12.53 10.1971L10.06 12.6671L12.53 15.1371C12.82 15.4271 12.82 15.9071 12.53 16.1971C12.24 16.4871 11.76 16.4871 11.47 16.1971L8.47 13.1971C8.18 12.9071 8.18 12.4271 8.47 12.1371L11.47 9.13705C11.62 8.98705 11.81 8.91705 12 8.91705Z"
            fill="#FF445F"
          />
        </svg>
      </template>
      Étape précédente
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineEmits(["click"]);
</script>

<style scoped>
.back-button-container {
  display: flex;
  justify-content: flex-start;
}

.back-button-container .v-btn {
  width: 207px;
  height: 56px;
  border-radius: 43px;
  padding: 16px 24px;
  border: 1px solid #ff445f !important;
  background-color: transparent !important;
  color: #ff445f !important;

  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  text-transform: none;
  transition: background-color 0.2s ease;
}

.back-button-container .v-btn:hover {
  background-color: #fff0f1 !important;
  color: #ff445f !important;
}
.previous-icon {
  margin-right: 4px;
}
</style>
