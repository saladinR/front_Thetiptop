<template>
  <div class="register-container">
    <div class="register-form">
      <img  src="@/assets/imageC.png"
            alt="Logo" style="width: 200px; height: ">
      <h2>Inscription</h2>
      <span  style="color: red;margin-right: 390px;margin-top: -10px" v-if="emailincorect">* </span>
      <input type="text"  style="    margin-top: -9px
px
;" placeholder="Nom"  @keyup="testformul" v-model="data.name">
      <input type="email" style="    margin-top: -9px
px
;" placeholder="Adresse e-mail" @keyup="testformul" v-model="data.email">
      <span  style="color: red;    padding-right: 262px;
    font-size: 13px;" v-if="emailincorect">Email incorrecte</span>
      <input   @keyup="testformul" type="password" style="    margin-top: -9px
px
;" placeholder="Mot de passe" v-model="data.password" >
      <input type="password" style="    margin-top: -9px
px
;" placeholder="Confirmer le mot de passe"  @keyup="testformul" v-model="data.confirmPassword">
      <span  style="color: red;    padding-right: 262px;
    font-size: 13px;margin-top: -10px" v-if="emailincorect">Mot de passe ne correspond pas </span>
      <button @click="register" :disabled="store.$state.isLoading">S'enregistrer
        <div class="spinner-border" role="status" v-if="store.$state.isLoading">
          <span class="sr-only" ></span>
        </div>
        </button>
      <button @click="router.push('/login')"  style="margin-top: 20px; color: green;background-color: burlywood" >Se connecter

      </button>
      <div class="footer">
        <a href="propos"> À propos de ThéTipTop
          <img src="@/assets/image.png" alt="Footer Logo">
        </a>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useStore} from "@/store/store";
import {email, required} from "@vuelidate/validators/dist";
import {useVuelidate} from "@vuelidate/core";
import router from "@/router";
const store = useStore(); // Utilisez la fonction useStore pour obtenir l'instance du store
let passworderropr=ref(false)
const data = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const rules = {
  email: { required, email },
  name: { required },
  password: { required },
  confirmPassword: { required },
};
const v$ = useVuelidate(rules, data);
let emailincorect=ref(false)

function testformul(){
  emailincorect.value = false
}
async function register() {
  passworderropr.value=false
  console.log(data, store.message)
  emailincorect.value=true
  console.log(data.password==data.confirmPassword)
if(data.password==data.confirmPassword) {
  if (v$.value.$invalid) {
    emailincorect.value = false
    console.log("erererre",v$.value.$invalid,v$.value.email.$error,data)
    return;
  }
  console.log(v$.value)
  passworderropr.value=false
  emailincorect.value = false
  await store.register(data)
  if (store.$state.isConnected) {
    console.log("push ver home")
    router.push('home')
    emailincorect.value = false
  } else
    emailincorect.value = true
}
else   passworderropr.value = true

  // Exemple de redirection vers une autre page
}
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(''); /* Remplacez 'lien_de_votre_image.jpg' par le chemin de votre image */


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
.register-form {
  width: 80%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.register-form h2 {
  margin-bottom: 20px;
}

.register-form input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-form button {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
</style>