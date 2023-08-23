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
  },{
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
    path: '',
    name: 'home2',
    component: HomeView
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
  console.log(localStorage.getItem('user'),to.path)
  const isAuthenticated = localStorage.getItem('user');
  if (isAuthenticated==null && to.path!="/login" && to.path!="/register" && to.path!="/propos") {
    next('/login'); // Remplacez '/login' par le chemin de votre page de connexion
  } else {
    // if (to.path=="/login")
    //   next('/home');
    // else
      next()
    // else
    // if (!to.matched.length)
    //   next('/not-found');
    // else
    //   next();
  }
}
router.beforeEach(authMiddleware);
export default router
