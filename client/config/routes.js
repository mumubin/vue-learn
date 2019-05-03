import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  // {
  //   path: '/app/:id',
  //   // path: '/app',
  //   props: true,
  //   component: () => import('../views/todo/todo.vue'),
  //   name: 'app',
  //   meta: {
  //     title: 'this is app title',
  //     description: 'this is app description'
  //   },
  //
  //
  //   children:[
  //     {
  //       path: '/test',
  //       component: Login
  //     },
  //   ]
  // },
  {
    path: '/app',
    component: Todo
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/exact',
    component: Login
  }

]
