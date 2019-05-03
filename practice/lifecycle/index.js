import Vue from 'vue'

new Vue({
  el:'#root',
  data:{
    text: 'aaa'
  },

  beforeCreate(){
    console.log(this,'beforeCreate ')
  },
  created(){
    console.log(this,'created ')
  },
  beforeMount(){
    console.log(this,'beforeMount ')
  },
  mounted(){
    console.log(this,'mounted ')
  },
  beforeUpdate(){
    console.log(this,'beforeUpdate ')
  },
  Updated(){
    console.log(this,'Updated ')
  },
  activated(){
    console.log(this,'actived ')
  },
  deactivated  (){
    console.log(this,'deactived ')
  },
  beforeDestroy(){
    console.log(this,'beforeDestroy ')
  },
  destroyed(){
    console.log(this,'destroyed ')
  }


  ,template: '<div>{{text}}</div>'

})
