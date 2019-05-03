import Vue from 'vue'

new Vue({
  el: "#root",
  data:{
    isActive: false
  },
  template: `
  <div>
    {{isActive? 'active' :'not active'}}
  </div>
  `

})

