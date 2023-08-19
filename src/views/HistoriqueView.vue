<template>
  <body>
  <!-- Partie supérieure avec image de fond -->
  <div class="top-section">
    <div class="title">Titre Centralisé</div>
  </div>

  <!-- Partie inférieure avec la table -->
  <div class="table-section">
    <table>
      <thead>
      <tr>
        <th>ticket</th>
        <th>gain</th>
        <th>user</th>
      </tr>
      </thead>
      <div class="spinner-border" role="status" v-if="store.$state.isLoading">
        <span class="sr-only"></span>
      </div>
      <tbody v-else >
      <tr v-for="item in store.historyList" :key="item.ticketNumero">
        <td>{{item.ticketNumero}}</td>
        <td>{{item.gainDescription}}</td>
        <td>{{ username }}</td>
      </tr>
      <!-- Ajoutez plus de lignes ici si nécessaire -->
      </tbody>
    </table>
  </div>
  </body>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useStore } from '@/store/store';
import router from "@/router"; // Importez le store

const store = useStore(); // Utilisez la fonction useSt
let ticket=ref("")
let username=ref("")
async function history() {
  const storedObjectString = localStorage.getItem("user");
  let id = null
  if (storedObjectString) {
    // Convert the JSON string back to an object
    id = JSON.parse(storedObjectString).id;
    username = JSON.parse(storedObjectString).email;

  } else {
    id = null
  }
  let data={
    numero: "",
    idUser: id
  }
  await store.history(data)
}
 history()
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Partie supérieure avec image de fond */
.top-section {
  background-image: url('https://thumbs.dreamstime.com/b/summer-sunny-forest-trees-green-grass-nature-wood-sunlight-background-instant-toned-image-53353502.jpg'); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */
  background-size: cover;
  background-position: center;
  text-align: center;
  color: white;
  padding: 100px 0;
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Styles pour le titre */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Styles pour la table */
.table-section {
  flex: 0.7;
  padding: 20px;
}

/* Styles pour la table elle-même */
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
}

/* Styles pour les cellules de la table */
th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

/* Styles pour l'en-tête de la table */
th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
