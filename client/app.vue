<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <p>{{ fullName }} {{ count }}</p>
    <router-link to="/app">
      app
    </router-link>
    <router-link to="/login">
      login
    </router-link>
    <router-link to="/login/exact">
      login exact
    </router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'


  export default {
    components: {
      Header, Footer
    },
    computed: {
      ...mapState(['count']),
      // count(){
      //   return this.$store.state.count
      // },
      ...mapGetters(['fullName'])
      // fullName (){
      //   return this.$store.getters.fullName
      // }
    },

    mounted() {
      console.log(this.$store)
      // let i = 1
      this. $store.dispatch('updateCountAsync', {
        num: 5,
        time: 2000
      })
      // this.updateCountAsync({
      //   num: 5,
      //   time: 2000
      // })
      // setInterval(() => {
      //   this.$store.commit('updateCount',i++)
      // },1000)
    },
    methods: {
      ...mapActions['updateCountAsync'],
      ...mapMutations['updateCount']
    },
  };
</script>
<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0

  #cover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity 0.2
    z-index -1
</style>

