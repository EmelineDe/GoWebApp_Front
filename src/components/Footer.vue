<template>
  <footer class="footer">
    <div class="footer-content">
      <span class="footer-text">Depannage App<span class="dot">.</span></span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  padding: 15px 0;
  z-index: 100;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-text {
  color: #ffffff;
  font-family: "Aller", sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
}

.dot {
  color: #ff445f;
}
</style>
