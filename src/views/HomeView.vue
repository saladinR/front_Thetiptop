<template>
  <body>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
      <!-- Marque de la navbar -->
      <a class="navbar-brand" href="/">
        <img src="@/assets/imageP.png" alt="Logo" style="width: 110px; height: 70px;">
      </a>
      <!-- Boutons dans la navbar -->
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
  <div class="bodyclasse">
  <div class="input-container">
    <!-- Champ de saisie centré -->
    <div class="text-center">
      <input type="text" class="form-control" style="    margin-bottom: 23px;" v-model="ticket" placeholder="Entrez votre key...">
      <!-- Bouton d'envoi -->
      <button class="btn btn-primary mt-3 custom-button"  type="button"
              @click="tirage()"
              data-bs-toggle="modal" data-bs-target="#exampleModal">Envoyer</button>
    </div>
  </div>
  </div>




  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="congratulationsModalLabel">Découvrir votre adeau Spécial !</h5>
          <button  type="button" class="btn btn-secondary close" data-bs-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div v-if="ticket==''" style="height: 100px;margin-top: 100px">
Saisir une ticket
        </div>
        <div v-else>
<div v-if="store.isLoading">
  <div class="spinner-border" role="status" >
    <span class="sr-only"></span>
  </div>
</div>
        <div class="modal-body" v-else>
          <div v-if="'Ticket invalide ou déjà utilisé.'==store.responseOfticket">
            <img src="https://www.wishesquotes.com/wp-content/uploads/2022/09/Hamster-Balloon-Sorry.jpg" class="popup-image" alt="Cadeau">
            <p class="mt-3">{{store.$state.responseOfticket}} </p>
          </div>
          <div v-else>
            <img src=" https://i.pinimg.com/474x/61/8c/43/618c43b526ede35ee79532af6dc06001.jpg" class="popup-image" alt="Cadeau">
            <p class="mt-3">{{store.$state.responseOfticket}}</p>
          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
        </div>
      </div>
    </div>
    </div>
  </div>
  <!-- Inclure les scripts Bootstrap JS (facultatif) -->
  </body>


  <Transition>
    <ModalTest
        v-show="store.isModalVisible"
        @close="closeModal"
        class="mard"
    >
      <template v-slot:header>
        This is a new modal header.
      </template>

      <template v-slot:body>
        This is a new modal body.
      </template>

      <template v-slot:footer>
        This is a new modal footer.
      </template>
    </ModalTest>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from '@/components/ModalTest.vue'; // @ is an alias to /src
import { useStore } from '@/store/store';
import router from "@/router";
import ModalTest from "@/components/ModalTest.vue"; // Importez le store

const store = useStore(); // Utilisez la fonction useSt
let ticket=ref("")
async function tirage() {
  const storedObjectString = localStorage.getItem("user");
  let id = null
  if (storedObjectString) {
    // Convert the JSON string back to an object
    id = JSON.parse(storedObjectString).id;

  } else {
    id = null
  }
  await store.tirage({numero: ticket.value, idUser: id})
}


const isModalVisible = ref<boolean>(false);

function openModal() {
  store.isModalVisible = true;
}

function closeModal() {
  store.isModalVisible = false;
}
function deconnecter(){
  localStorage.removeItem('user');
}

</script>
<style scoped>
.bodyclasse {
  background-image: url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg'); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
/* Ajouter un espacement autour du champ de saisie */
.input-container {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 157px;
}
/* Personnaliser le bouton */
.custom-button {
  background-size: cover;
  color: white;
  background-color: #42b983;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.navbar-custom {
  background-color: #333;
}
/* Personnaliser la couleur du texte dans la navbar */
.navbar-custom .navbar-nav .nav-link {
  color: white;
}

.modal-content {
  background-color: #f8f9fa;
  border-radius: 10px;
}

/* Styles pour le titre de la popup */
.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Styles pour le contenu de la popup */
.modal-body {
  text-align: center;
  padding: 20px;
}

/* Styles pour l'image dans la popup */
.popup-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Styles pour le bouton de la popup */
.modal-footer .btn-secondary {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
