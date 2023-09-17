import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HiostoriqueView from '../views/HistoriqueView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import RegisterView from '../views/RegisterView.vue'
import StaticPageView from '../views/StaticPageView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 't',
    component: HomeView
  }
  ,{
    path: '/propos',
    name: 'propos',
    component: StaticPageView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/historique',
    name: 'historique',
    component: HiostoriqueView
  },
  {
    path: '/login',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/Profil',
    name: 'profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView.vue')
  },
  {
    path: '/contactNous',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactHistoriqueView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView // Remplacez par le composant de votre page Not Found
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
function authMiddleware(to:any, from:any, next:any) {
  const isAuthenticated = localStorage.getItem('user');
  //alert(isAuthenticated==null)
  if(to.path=="/login" && isAuthenticated!=null) {
    next('/home');
    return;
  }
  if (isAuthenticated==null &&
      to.path!="/login" &&
      to.path!="/register"
      && to.path!="/propos" && to.path!="/contactNous") {
    next('/login');
  } else {
      next()
  }
}
router.beforeEach(authMiddleware);
export default router
