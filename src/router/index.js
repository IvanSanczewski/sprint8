import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StarshipsListView from '../views/StarshipsListView.vue'
import StarshipDetailsView from '../views/StarshipDetailsView.vue'
// import PilotsListView from '@/views/PilotsListView.vue'
import PilotsListView from '../views/PilotsListView.vue'
import PilotDetailsView from '../views/PilotDetailsView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import store from '@/store'

// import { userIsLogged } from '@/store/index' // NOT RECOGNISED

const routes = [
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/starships',
    name: 'StarshipsListView',
    component: StarshipsListView,

    beforeEnter: (to, from, next) => {
      if(!store.getters.userIsLogged) {
        // store.commit('toggleLogIn', '/starships')
        store.commit('toggleLogIn')
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/starships/:id',
    name: 'StarshipDetailsView',
    component: StarshipDetailsView,
    props: true
  },
  {
    path: '/pilots',
    name: 'PilotsListView',
    component: PilotsListView,
    
    beforeEnter: (to, from, next) => {
      if(!store.getters.userIsLogged) {
        // store.commit('toggleLogIn', 'pilots')
        store.commit('toggleLogIn')
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/pilots/:id',
    name: 'PilotDetailsView',
    component: PilotDetailsView,
    props: true
  },
  {
    path: '/',
    name: '/WelcomeView',
    component: WelcomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router

