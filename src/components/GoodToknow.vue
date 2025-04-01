<template>
  <v-card class="good-to-know-card">
    <v-img
      src="/src/assets/images/OIP.png"
      alt="image"
      class="good-to-know-image"
      cover
    />
    <h3 class="good-to-know-title">Bon à savoir</h3>

    <p class="good-to-know-text">
      Vous faites face à des WC bouchés qui ne se vident plus correctement ?
      Vous vous interrogez sur les raisons de ce blocage et les solutions pour y
      remédier ? Faites appel à un plombier de MesDépanneurs.fr pour un
      débouchage efficace et rapide de vos toilettes !<br /><br />

      Informations utiles pour le cas "Débouchage de WC"<br />
      Le coût du débouchage de WC sans sanibroyeur dépend de l'ampleur de
      l'engorgement de vos toilettes et de la complexité à éliminer le bouchon.
      Le cas "Débouchage de WC" comprend les prestations suivantes :<br /><br />

      – Les frais de déplacement et de main-d’œuvre,<br />
      – La fourniture du matériel (pompe manuelle, acides, furet électrique,
      etc)<br />
      – Le débouchage des WC,<br />
      – Le nettoyage du chantier.<br /><br />

      Dans les cas les plus complexes, où le dégorgement dure plus de deux
      heures, le coût total pourrait excéder le devis initial (si l’usage d’un
      furet électrique sur différents niveaux est requis par exemple).<br /><br />

      Néanmoins, sachez que le plombier vous préviendra en amont de toute
      modification des frais si cette situation se produit.
    </p>
  </v-card>
</template>

<style scoped>
.good-to-know-card {
  min-height: 736px;
  padding: 24px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 4px 7px 18px 7px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.good-to-know-img {
  width: 572px;
  height: 309px;
  border-radius: 10px;
  align-self: center;
}

.good-to-know-title {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 135%;
  letter-spacing: -0.01em;
  color: #443d3c;
  margin-top: 10px;
}

.good-to-know-text {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #443d3c;
  margin-top: 10px;
  white-space: pre-line;
}
</style>
