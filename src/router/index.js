import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateQuiz from '../views/CreateQuiz.vue'
import JoinQuiz from "../views/JoinQuiz.vue"
import Result from '../views/Result.vue'
import Feedback from '../views/Feedback.vue'
import Room from '../views/RoomCode.vue'
import {ElMessageBox} from "element-plus";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateQuiz
    },
    {
      path: '/join',
      name: 'join',
      component: JoinQuiz

    },
  {
      path: '/result',
      name: 'result',
      component: Result

  },
  {
    path: '/publish',
    name: 'publish',
    component: Feedback

},
{
  path: '/room',
  name: 'room',
  component: Room

}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    if (sessionStorage.getItem('uname')) {
        if (to.name === sessionStorage.getItem('status')) {
            next();
        } else next(sessionStorage.getItem('status'));
    } else {
        next('/')
    }
  } else {
      sessionStorage.clear();
      next();
  }
})

export default router

// ElMessageBox.confirm(
//     'Do you want to leave? The data will not be recorded.',
//     'Warning',
//     {
//         confirmButtonText: 'OK',
//         cancelButtonText: 'Cancel',
//         type: 'warning',
//     }
// )
//     .then(() => {
//         next({...to, replace: true})
//     })
//     .catch(() => {
//         next(false)
//     })} else next();