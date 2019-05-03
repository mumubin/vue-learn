import Vue from 'vue'

const  app = new Vue({
  // el: "#root",
  data:{
    text: 0
  },
  template: '<div>{{text}}</div>'

})

app.$mount('#root')

setInterval(() => {
  app.text += 1
  // app.$options.data.text += 1
},1000)

app.$options.render = (h) =>{
  return h('div',{},'new render function')
}
