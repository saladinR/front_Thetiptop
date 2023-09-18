<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-custom">
      <!-- Votre code de navigation ici -->
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

    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Profil</div>
            <div class="card-body text-center">
              <span v-if="error" style="color: red">Remplir tous les champs</span>
              <img class="profile-image" src="https://previews.123rf.com/images/mialima/mialima1603/mialima160300025/55096766-ic%C3%B4ne-d-utilisateur-homme-isol%C3%A9-sur-un-fond-blanc-compte-avatar-pour-le-web-utilisateur-photo-de.jpg" alt="Photo de profil">
              <div class="input-container">
                <input type="text" id="nom" name="nom" v-model="name" placeholder="Nom">
              </div>
              <div class="input-container">
                <input type="text" id="adresse" name="adresse" v-model="email" placeholder="Email">
              </div>
              <div class="button-container">
                <button @click="send" :disabled="isLoading">Modifier
                  <div class="spinner-border" role="status" v-if="isLoading">
                    <span class="sr-only"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const storedObjectString = localStorage.getItem("user");
console.log(storedObjectString);
let name = ref("");
let email = ref("");
let id = ref(0);
let error = ref(false);
let isLoading = ref(false);

if (storedObjectString) {
  name.value = JSON.parse(storedObjectString).email.substring(0, 5);
  email.value = JSON.parse(storedObjectString).email;
  id.value = JSON.parse(storedObjectString).id;
  console.log(storedObjectString);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function send() {
  error.value = false;
  if (name.value == "" || email.value == "") error.value = true;
  else {
    isLoading.value = true;
    await sleep(5000); // Attendre 5 secondes (5000 millisecondes)
    toast("Profil modifié", {
      position: "top-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: "fas fa-rocket",
      rtl: false,
    });
    isLoading.value = false;
    localStorage.setItem(
        "user",
        JSON.stringify({ id: id.value, email: email.value, roles: ["ROLE_USER"] })
    );
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f12525; /* Couleur d'arrière-plan pour la page */
}

.navbar-custom {
  background-color: #ffffff;
}
/* Personnaliser la couleur du texte dans la navbar */
.navbar-custom .navbar-nav .nav-link {
  color: rgb(1, 41, 4);
}
.card {
  margin-top: 20px;
}
body {
  font-family: Arial, sans-serif;
}

.profile-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}


.input-container {
  margin-bottom: 15px;
  text-align: left;
}

.input-container label {
  display: block;
  font-weight: bold;
}

.input-container input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}


button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #555;
}
/* Le reste de votre style CSS ici */
</style>
