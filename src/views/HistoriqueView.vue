<template>
  <body>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="@/assets/imageP.png" alt="Logo" style="width: 110px; height: 70px;">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="Home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Historique">Historique</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="propos">Qui somme nous</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contactNous">Contacter nous</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/login" @click="deconnecter()">Déconnexion</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Profil">
              <img class="profile-image" style="width: 40px;height: 40px;    margin-top: -10px;" src="https://previews.123rf.com/images/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de.jpg" alt="Photo de profil">
            </a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <div class="top-section">
    <div class="title">Historique</div>
  </div>

  <div class="table-section">
    <table>
      <thead>
      <tr>
        <th>Ticket</th>
        <th>Gain</th>
        <th>Utilisateur</th>
        <th>Date de creation</th>
      </tr>
      </thead>
      <div  v-if="store.isLoading"  style="width: 552%;">
        <div class="spinner-border " role="status">
          <span class="sr-only"></span>
        </div>
      </div>
      <tbody v-else >
      <tr v-for="item in store.historyList" :key="item.ticketNumero">
        <td>{{item.ticketNumero}}</td>
        <td>{{item.gainDescription}}</td>
        <td>{{ username }}</td>
        <td>{{item.dateTirage.date}}</td>
      </tr>
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
function deconnecter(){
  localStorage.removeItem('user');
}
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
  let data = {
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
  background-image: url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHx8fDE2OTI2NDA3NTJ8MA&ixlib=rb-4.0.3&q=85'); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */
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

.navbar-custom {
  background-color: #333;
}
/* Personnaliser la couleur du texte dans la navbar */
.navbar-custom .navbar-nav .nav-link {
  color: white;
}

.center{
  margin-left: 400px;
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
