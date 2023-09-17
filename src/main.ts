import router from './router'
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

//use it
const app = createApp(App);
const pinia = createPinia(); // Create a Pinia instance
app.use(Toast)
app.use(pinia);
app.use(router);

app.mount('#app');
