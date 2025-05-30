<template>
  <header class="app-header">
    <!-- Bloc logo DepannageApp. -->
    <div class="logo-container">
      <span class="logo">Depannage App</span>
      <span class="dot">.</span>
    </div>

    <!-- Bloc Contact -->
    <div class="contact">Contact</div>
  </header>
</template>

<style scoped>
/*  Barre principale */
.app-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: #ffffff;
  height: auto;
}
/* Bloc DepannageApp. */
.logo-container {
  justify-self: start;
  margin-left: 0;
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
  justify-self: end;
  text-align: right;
  margin-right: 0;
  border-radius: 0 16px 0 0;
}
</style>
