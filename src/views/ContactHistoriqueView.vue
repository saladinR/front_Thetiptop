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
  <div class="container">
    <img  src="@/assets/image.png"
          alt="Logo" style="width: 200px; height: ">
    <form id="contact-form">
      <span v-if="error" style="color: red">Remplir tous les champ</span>

      <input type="text" id="nom" name="nom"   v-model="name"  placeholder="Nom" >

      <input type="text" id="email" name="email" placeholder="numero" v-model="number" >
      <input type="email" id="email" name="email"  placeholder="Email"  v-model="email"  >

      <textarea id="message" name="message" rows="4"  v-model="desc" ></textarea>

    </form>
    <button  @click="send" :disabled="isLoading">Envoyer
      <div class="spinner-border" role="status" v-if="isLoading">
        <span class="sr-only"></span>
      </div>
    </button>

  </div>  </body>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
let name=ref("");
let number=ref("");
let email=ref("");
let desc=ref("");
let error=ref(false);
let isLoading=ref(false);


function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function deconnecter(){
  localStorage.removeItem('user');
}
async function send() {
  error.value = false
  if (name.value == "" || number.value == "" || email.value == "" || desc.value == "")
    error.value = true
  else {
    isLoading.value = true
    await sleep(5000); // Attendre 5 secondes (5000 millisecondes)
    toast("Message bien Envoyé , merci de nou contacte", {
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
      rtl: false
    });
    isLoading.value = false

  }
}
</script>
<style scoped>

.navbar-custom {
  background-color: #ffffff;
}
/* Personnaliser la couleur du texte dans la navbar */
.navbar-custom .navbar-nav .nav-link {
  color: rgb(1, 41, 4);
}
body {
  height: 728px;
  margin: 0;
  padding: 0;
  background-image: url('../assets/background_home.jpg'); /* Remplacez 'votre-image.jpg' par le chemin de votre image de fond */
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  color: #333;
}

header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
textarea {
  padding: 10px;
  margin-bottom: 10px;
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

</style>