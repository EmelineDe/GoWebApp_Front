# GoWebApp - Frontend

GoWebApp est une application Vue 3 développée avec Vite, Vuetify, Pinia et TypeScript. Elle permet de qualifier un chantier de dépannage à travers un système de **questionnaire dynamique** en trois étapes, suivi d’un formulaire de contact.

## 🔧 Technologies utilisées

- **Vue 3 (Composition API)**
- **Vite**
- **TypeScript**
- **Vuetify 3**
- **Pinia** (gestion d'état)
- **Zod** (validation des données)
- **Axios** (requêtes HTTP)
- **Vue Router**
- **Vitest** (tests unitaires)

## ⚙️ Fonctionnalités principales

- Système de questions/réponses dynamique en fonction des réponses sélectionnées
- Retour arrière possible à chaque étape du questionnaire (y compris via bouton navigateur)
- Page récapitulative des réponses avec possibilité de :
  - Demander une intervention via un formulaire
  - Voir les services inclus
  - Afficher un numéro de téléphone
- Validation complète du formulaire utilisateur avec Zod et feedback visuel (Vuetify)
- Navigation sécurisée : accès aux routes protégées uniquement via le parcours prévu
- Tests unitaires des composants critiques (`Vitest` + `Vue Test Utils`)


## 📁 Structure du projet

```
src/
├── assets/                 # Images & logos
├── components/             # Composants Vue réutilisables
├── composable/             # Hooks personnalisés (validation, navigation...)
├── interfaces/             # Interfaces TypeScript
├── mocks/                  # Mocks pour les tests unitaires
├── router/                 # Configuration de Vue Router
├── stores/                 # Stores Pinia
├── views/                  # Pages principales (Home, Questionnaire, Récapitulatif)
├── App.vue                 # Composant racine
├── main.ts                 # Point d'entrée de l'application
└── api.ts                  # Centralisation des appels Axios
```

## 🧪 Tests

L'application utilise **Vitest** et **Vue Test Utils**.

### Lancer les tests :
```sh
npm run test
```
### Lancer les tests avec couvertures de tests :
```sh
npx vitest run --coverage
```

## ▶️ Lancer le projet

### Installation des dépendances :
```sh
npm install
```

### Lancer le serveur de développement :
```sh
npm run dev
```

### Compiler pour la production :
```sh
npm run build
```

## 🧠 Bonnes pratiques

- Tous les appels API sont centralisés dans `api.ts`
- Les appels API sont effectués exclusivement depuis les **stores Pinia**
- La logique métier est placée dans des **composables réutilisables**
- Les données utilisateurs sont typées et validées avec **Zod**
- Le code est commenté avec des **JSDoc** pour la maintenabilité
- Les routes sont protégées contre l’accès direct ou l’actualisation forcée


## 🧑‍💻 Développeur

Ce projet a été réalisé dans le cadre d’un test technique pour Goweb par Emeline Delobel.
