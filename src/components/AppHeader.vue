<template>
  <header class="app-header">
    <!-- Bloc logo Goweb. -->
    <div class="logo-container">
      <span class="logo">Goweb</span>
      <span class="dot">.</span>
    </div>

    <!-- Bloc Contact -->
    <div class="contact">Contact</div>
  </header>
</template>

<style scoped>
/*  Barre principale */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 61px;
  background-color: #ffffff;
  color: #000000;
  font-family: "Aller", sans-serif;
}

/* Bloc Goweb. */
.logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  height: 100%;
  background-color: #443d3c;
}

.logo {
  font-style: italic;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  color: #ffffff;
}

.dot {
  font-style: italic;
  font-weight: 700;
  font-size: 20px;
  color: #ff445f;
}

/*  Bloc Contact */
.contact {
  width: 125px;
  height: 61px;
  padding: 16px 24px;
  background-color: #ff445f;
  color: #ffffff;
  font-family: "Catamaran", sans-serif;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 16px 0 0;
}
</style>
