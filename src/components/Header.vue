<template>
  <div class="header">
    <div class="sns">
      <span class="social-icon"><font-awesome-icon :icon="['fab', 'facebook']" /></span>
      <span class="social-icon"><font-awesome-icon :icon="['fab', 'instagram']" /></span>
      <span class="social-icon"><font-awesome-icon :icon="['fab', 'twitter']" /></span>
      <span class="social-icon"><font-awesome-icon :icon="['fab', 'youtube']" /></span> 
      <span class="v-separator"></span>       
      <span class="social-icon-kids">KIDS</span>
    </div>
    <img class="logo" src="@/assets/Star_Wars_Logo.png" alt="The Star Wars Logo">
    <div class="login">
      <span @click="$store.commit('toggleLogIn')">LOG IN</span> //
      <span @click="$store.commit('toggleSignIn')">SIGN UP</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleLogIn','toggleSingIn'])
  }
}
</script>

<style>
  .header {
    background: url('@/assets/starwars_background_nofocus.jpg');

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    
    font-weight:900 ; 
    /* color: #888; */
  }

  @media screen and (max-width: 768px) {
    .header {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }
    .header>.sns {
      font-size: 1em;
      margin: 0.5em 0 0 0
    }
    .logo {
      margin: -.5em 0
    }
  }
  
  .sns{
    height:fit-content;

    display:flex;
    column-gap: .5em;
    
    margin: 1em;
    font-size: 1.4em;
  }
  
  .social-icon {
    cursor: pointer;
  }
  .social-icon:hover {
    color: white
  }
  
  .v-separator {
    border-left: 1px solid #333
  }

  .social-icon-kids {
    margin-top: .6em;
    padding: 0 .5em;

    height: 1.5em;

    font-size: .5em;
    font-weight: 900;

    color: black;
    background: #888;
    
    border-radius: 1em;
    
    cursor: pointer;
  }
  .social-icon-kids:hover {
    background: white;
  }
  .social-icon-kids:before {
    border-left: 3px solid red
  }
  .logo {
    width: 300px;

    cursor: pointer
  }
  
  .login{
    height:fit-content;

    display:flex;
    column-gap: .5em;
    
    margin: 1em
  }
  
  .login span {
    cursor: pointer
  }
  .login span:hover {
    color: white
  }
</style>