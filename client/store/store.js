import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins:[
      (store) => {
        // init invoke
        console.log('my plugin invoked')
        // store.subscribe()
      }
    ],
    modules: {
      a: {
        state: {
          text: 1
        }
      }

    }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMuations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
          state: newState,
          mutations: newMuations,
          actions: newActions,
          getters: newGetters
        }
      )
    })
  }
  return store
}
