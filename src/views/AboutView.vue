<template>

  <div class="login-container">
    <div class="login-image"></div>
    <div class="login-form">
      <h2>Connexion</h2>
      <span v-if="!formaemail" style="color: red;font-size: 15px;">saisir un corect email et un mot de pase</span>

      <input type="text" placeholder="Nom d'utilisateur" v-model="data.email">
      <input type="password" placeholder="Mot de passe" v-model="data.password">
      <span v-if="emailincorect" style="color: red">email ou mot de passe incorrce</span>
      <button @click="connecte" :disabled="store.$state.isLoading">Se connecter
        <div class="spinner-border" role="status" v-if="store.$state.isLoading">
          <span class="sr-only"></span>
        </div>
      </button>
      <div class="signup-link">
        <a href="#">S'inscrire</a>
      </div>
      <button class="facebook-button">Se connecter avec Facebook</button>
    </div>
  </div>

</template>

<script setup lang="ts">
import {reactive,computed,ref} from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useStore } from '@/store/store';
import router from "@/router"; // Importez le store

const store = useStore(); // Utilisez la fonction useStore pour obtenir l'instance du store
const message = computed(() => store.message);

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
  console.log(data, store.message)
  emailincorect.value = false
  formaemail.value=true


  if (v$.value.$invalid) {
    formaemail.value=false
    // Le formulaire a des erreurs de validation
    console.log(v$.value.email.$error)
    return;
  }
  console.log(v$.value)
  // Le formulaire est valide, procédez à la soumission
  console.log('Form submitted successfully');
  await store.login(data)
  console.log(store.$state.isConnected)
  if (store.$state.isConnected) {
    console.log("push ver home")
    router.push('home')
    emailincorect.value = false
  } else
    emailincorect.value = true

  // Exemple de redirection vers une autre page
}
</script>
<style>

.login-container {
  height: 700px ;
  display: flex;
  width: 100%; /* Remplir toute la largeur de la fenêtre */
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.login-image {
  width: 50%;
  background-image: url('https://thumbs.dreamstime.com/b/summer-sunny-forest-trees-green-grass-nature-wood-sunlight-background-instant-toned-image-53353502.jpg'); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */
  background-size: cover;
  background-position: center;
}
.login-form {
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background-color: green;
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
  background-color: #1877f2; /* Couleur bleue originale de Facebook */
  color: white;}
</style>
