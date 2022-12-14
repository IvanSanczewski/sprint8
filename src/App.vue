<template>

  <SignLogIn />
  <Header />
  <NavBar />
  <router-view/>

</template>

<script>
// import state from '@/store/index'
import { mapActions } from 'vuex'
import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
import SignLogIn from '@/components/SignLogIn.vue'
import store from './store'



export default {
  components: { Header, NavBar, SignLogIn },
  methods: {
    ...mapActions(['getStarships', 'getPilots']),
  },
  mounted() {
    // fetch starships and pilots data using the mounted lifecycle hook, so data is available at any moment the user needs it
    console.log('App mounted');
    this.getStarships(1) 
    this.getPilots(1) 
  },
}
</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #888;

    height: 100vh;
  }
  
  body {
    background: url('@/assets/star-wars-backgrounds-25.jpeg');
  }
  
  body, h1, h3, h5 {
    margin: 0;
    padding: 0;
    letter-spacing: 0.06em;
  }

  
  p {
    margin: 0.5em 1em;
  }

  a {
    text-decoration: none;
    color: white;
  }
  
  nav {
    padding: 1em;
    margin-bottom: 1em;

    text-transform: uppercase;

    background: black;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333
  }
  
  nav a {
    padding: 1em;
  }

  nav a:hover {
    box-shadow: inset 0 -2px 0 #1919fa;
  }
  
  nav a:first-child {
    border-left: 1px solid #333;
    border-right: 1px solid #333
  }

  nav a:nth-child(n) {
    border-right: 1px solid #333
  }
</style>
