<template>

  <div class="login-container">
    <div class="login-image">
    </div>
    <div class="login-form">
      <img  src="@/assets/image.png"
           alt="Logo" style="width: 200px; height: ">
      <h2>Connexion</h2>
      <span v-if="!formaemail" style="color: red;font-size: 15px;">saisir un corect email et un mot de passe</span>
      <input type="text" placeholder="Nom d'utilisateur" v-model="data.email" id="usernameInput">
      <input type="password" placeholder="Mot de passe" v-model="data.password" id="passwordInput">
      <span v-if="emailincorect" style="color: red">email ou mot de passe incorrce</span>
      <button @click="connecte" :disabled="store.$state.isLoading" class="facebook-button" style="background-color: #42b983 !important;">
        <span style="padding-left: 80px ;color: white" id="loginButton"> Se connecter</span>
        <div class="spinner-border" role="status" v-if="store.$state.isLoading">
          <span class="sr-only"></span>
        </div>
      </button>
      <div class="signup-link">
        <button class="facebook-button" style="background-color: #d5a127 !important;">
          <a href="register" style="padding-left: 80px ;color: white">S'inscrire</a>

        </button>
      </div>
      <!-- <button class="facebook-button">
        Se connecter avec Facebook <img src="data:image/png;base64,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" alt="Facebook Logo"></button> -->

      <div class="footer">
        <a href="propos"> À propos de ThéTipTop
          <img src="@/assets/image.png" alt="Footer Logo">
        </a>
      </div>
    </div>

    <!-- <div class="footer" style="padding-right: 10px">
      <a href="contactNous"> Contact nous
      </a>
    </div> -->

  </div>
  <div>
    <div>
      <div>
<!--        <button @click="openModal">😾</button>-->
      </div>
    </div>
  </div>

  <Transition>
    <ModalTest
        v-show="isModalVisible"
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
import {reactive,computed,ref} from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useStore } from '@/store/store';
import router from "@/router"; // Importez le store
import $ from 'jquery';
import ModalTest from "@/components/ModalTest.vue";


const store = useStore(); // Utilisez la fonction useStore pour obtenir l'instance du store
const message = computed(() => store.message);


function openModal() {
  store.isModalVisible = true;
}

const changeMessage = () => {
  store.updateMessage('New message');
};
const data = reactive({
  email: '',
  password: ''
});

const rules = {
  email: { required, email },
  password: { required }
};
let formaemail=ref(true);
const v$ = useVuelidate(rules, data);
let emailincorect=ref(false)
async function connecte() {
  emailincorect.value = false
  formaemail.value=true
  if (v$.value.$invalid) {
    formaemail.value=false
    // Le formulaire a des erreurs de validation
    return;
  }
  // Le formulaire est valide, procédez à la soumission
  await store.login(data)
  if (store.$state.isConnected) {
    router.push('home')
    emailincorect.value = false
    openModal()
  } else
    emailincorect.value = true
  // Exemple de redirection vers une autre page
}


</script>
<style>
.mard{
  height: 40%;
}
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
}
.footer {
  text-align: center;
  margin-top: 20px;
}

.footer a {
  color: green; /* Green color for the link */
  text-decoration: none;
  margin-bottom: 0px;
  padding-bottom: 0px;
  padding-top: 45px;
}

.footer img {
  width: 65px;
}

.login-image {
  flex: 1;
  background-size: cover;
  background-image: url('../assets/login_app.jpg'); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */
  background-position: center;
}

.login-form {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Styles pour les écrans plus petits */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    height: auto;
  }

  .login-image {
    height: 300px;
    background-size: cover;
    background-image: url('https://thumbs.dreamstime.com/b/summer-sunny-forest-trees-green-grass-nature-wood-sunlight-background-instant-toned-image-53353502.jpg'); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */
    background-position: center;
  }

  .login-form {
    width: 100%;
    padding: 10px;
  }
}
.login-form input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-form button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: rgb(120, 173, 120);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.signup-link {
  margin-top: 10px;
  text-align: center;
}
.facebook-button {
  background-color: #1877F2 !important; /* Facebook blue color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 280px;
  text-align: center;
}

.facebook-button img {
  width: 20px; /* Adjust the width as needed */
  height: 20px; /* Adjust the height as needed */
  margin-right: 10px;
}

</style>