import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import './assets/images/bg.jpg'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

store.registerModule('c',
  {
    state: {
      text: 4
    }

  })

store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched', newCount)
})


store.subscribe((mutation, state) => {
  console.log(mutation.type),
    console.log(mutation.payload)
})

store.subscribeAction((action, state) => {
  console.log(action.type),
    console.log(action.payload)
})

router.beforeEach((to, from, next) => {
  console.log("beforeEach")
  next()
})

router.beforeResolve((to, from, next) => {
  console.log("beforeResolve")
  next()
})

router.afterEach((to, from) => {
  console.log("afterEach")
})


const app = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')

app.$watch('text', (newText, oldText) => {

})

app.$on('test', () => {

})

app.$emit('test', () => {

})

app.$forceUpdate()

