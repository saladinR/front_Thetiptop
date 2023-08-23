
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ref } from 'vue';

export default function isAuthenticated(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated'));

    if (isAuthenticated.value) {
        // Utilisateur connecté, passer à la route suivante
        next();
    } else {
        // Utilisateur non connecté, rediriger vers la page de connexion
        next('/login');
    }
}